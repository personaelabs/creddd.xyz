use futures::future::join_all;
use futures::join;
use indexer_rs::contract::ContractType;
use indexer_rs::eth_rpc::EthRpcClient;
use indexer_rs::group::get_all_groups;
use indexer_rs::intrinsic_creddd_sync_engine::IntrinsicCredddSyncEngine;
use indexer_rs::log_sync_engine::LogSyncEngine;
use indexer_rs::postgres::init_neynar_db;
use indexer_rs::postgres::init_postgres;
use indexer_rs::processors::all_holders::AllHoldersIndexer;
use indexer_rs::processors::believer::BelieverIndexer;
use indexer_rs::processors::creddd_team::CredddTeamIndexer;
use indexer_rs::processors::early_holders::EarlyHolderIndexer;
use indexer_rs::processors::salon::SalonIndexer;
use indexer_rs::processors::ticker::TickerIndexer;
use indexer_rs::processors::whales::WhaleIndexer;
use indexer_rs::processors::GroupIndexer;
use indexer_rs::processors::IndexerResources;
use indexer_rs::rocksdb_key::{
    ERC1155_TRANSFER_BATCH_EVENT_ID, ERC1155_TRANSFER_SINGLE_EVENT_ID, ERC20_TRANSFER_EVENT_ID,
    ERC721_TRANSFER_EVENT_ID,
};
use indexer_rs::server::server::start_server;
use indexer_rs::status_logger::start_status_logger;
use indexer_rs::tree_sync_engine::TreeSyncEngine;
use indexer_rs::utils::dotenv_config;
use indexer_rs::GroupType;
use indexer_rs::ROCKSDB_PATH;
use log::error;
use rocksdb::{Options, DB};
use std::collections::HashSet;
use std::sync::Arc;
use tokio::sync::Semaphore;

#[tokio::main]
async fn main() {
    dotenv_config();

    let pg_client = init_postgres().await;

    // Open the RocksDB connection
    let mut rocksdb_options = Options::default();
    rocksdb_options.create_if_missing(true);
    let rocksdb_conn = DB::open(&rocksdb_options, ROCKSDB_PATH).unwrap();

    let rocksdb_conn = rocksdb_conn;
    let rocksdb_client = Arc::new(rocksdb_conn);
    let eth_client = Arc::new(EthRpcClient::new());

    // It's ok to unwrap here because this is a one-time operation
    let groups = get_all_groups(&pg_client).await.unwrap();

    // Set to store the contracts that the groups depend on
    let mut contracts = HashSet::new();

    // Get the contracts that the groups depend on
    for group in groups.clone() {
        for contract in group.contract_inputs {
            contracts.insert(contract);
        }
    }

    let mut sync_jobs = vec![];
    for contract in contracts.clone() {
        let rocksdb_client = rocksdb_client.clone();
        let eth_client = eth_client.clone();

        let job = tokio::spawn(async move {
            // Determine the event_ids to sync from `contract.type`
            let event_id = match contract.contract_type {
                ContractType::ERC20 => vec![ERC20_TRANSFER_EVENT_ID],
                ContractType::ERC721 => vec![ERC721_TRANSFER_EVENT_ID],
                ContractType::Punk => vec![ERC721_TRANSFER_EVENT_ID],
                ContractType::ERC1155 => vec![
                    ERC1155_TRANSFER_SINGLE_EVENT_ID,
                    ERC1155_TRANSFER_BATCH_EVENT_ID,
                ],
                _ => panic!("Invalid contract type"),
            };

            // Run the sync job for each event_id
            join_all(event_id.iter().map(|event_id| async {
                let contract_sync_engine = LogSyncEngine::new(
                    eth_client.clone(),
                    contract.clone(),
                    *event_id,
                    rocksdb_client.clone(),
                );
                contract_sync_engine.sync().await;
            }))
            .await;
        });

        sync_jobs.push(job);
    }

    let mut indexing_jobs = vec![];

    let indexing_permits = Arc::new(Semaphore::new(20));

    for group in groups {
        // Initialize indexers for each group
        let resources = IndexerResources {
            pg_client: pg_client.clone(),
            rocksdb_client: rocksdb_client.clone(),
            eth_client: eth_client.clone(),
        };

        let pg_client = pg_client.clone();
        let rocksdb_client = rocksdb_client.clone();
        let eth_client = eth_client.clone();

        let indexing_permits = indexing_permits.clone();

        let job = tokio::spawn(async move {
            let pg_client = pg_client.clone();
            let rocksdb_client = rocksdb_client.clone();
            let eth_client = eth_client.clone();

            // Initialize the indexer for the target group
            let indexer: Box<dyn GroupIndexer> = match group.group_type {
                GroupType::AllHolders => {
                    Box::new(AllHoldersIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::EarlyHolder => {
                    Box::new(EarlyHolderIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::Whale => Box::new(WhaleIndexer::new(group.clone(), resources.clone())),
                GroupType::Ticker => Box::new(TickerIndexer::new(group.clone(), resources.clone())),
                GroupType::CredddTeam => {
                    Box::new(CredddTeamIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::Static => panic!("Static group type is deprecated"),
                GroupType::Believer => {
                    Box::new(BelieverIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::BaseSalon => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::BlastSalon => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::EthSalon => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::ArbSalon => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::OpSalon => Box::new(SalonIndexer::new(group.clone(), resources.clone())),
                GroupType::FriendBagHolder => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::Farcaster1K => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::Farcaster10K => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::Farcaster100K => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
                GroupType::FarcasterPowerUsers => {
                    Box::new(SalonIndexer::new(group.clone(), resources.clone()))
                }
            };

            // Initialize the tree sync engine for the group
            let tree_syn_engine = TreeSyncEngine::new(
                indexer,
                group,
                pg_client.clone(),
                rocksdb_client.clone(),
                eth_client.clone(),
                indexing_permits.clone(),
            );

            // Start the tree sync
            tree_syn_engine.sync().await;
        });

        indexing_jobs.push(job);
    }

    let fc_replica_db = init_neynar_db().await;

    let intrinsic_creddd_sync_engine =
        IntrinsicCredddSyncEngine::new(fc_replica_db, pg_client.clone());

    let intrinsic_creddd_sync_job = intrinsic_creddd_sync_engine.sync();

    let _pg_client = pg_client.clone();
    let sever_thread = tokio::spawn(async move {
        start_server(rocksdb_client.clone(), pg_client).await;
    });

    let pg_client = _pg_client;

    let status_logger_thread =
        tokio::spawn(async move { start_status_logger(pg_client.clone()).await });

    // Run the sync and indexing jobs concurrently
    let (sync_results, indexing_results, _intrinsic_result, server_result, _status_logger_result) = join!(
        join_all(sync_jobs),
        join_all(indexing_jobs),
        intrinsic_creddd_sync_job,
        sever_thread,
        status_logger_thread
    );

    for sync_result in sync_results {
        if let Err(e) = sync_result {
            error!("Sync thread failed: {:?}", e);
        }
    }

    for indexing_result in indexing_results {
        if let Err(e) = indexing_result {
            error!("Indexing thread failed: {:?}", e);
        }
    }

    // Handle the results
    if let Err(e) = server_result {
        error!("Server thread failed: {:?}", e);
    }
}

use indexer_rs::{
    contract::{upsert_contract, Contract, ContractType},
    contracts::{erc1155::erc1155_contracts, erc20::erc20_contracts, erc721::erc721_contracts},
    eth_rpc::Chain,
    postgres::init_postgres,
    utils::{dotenv_config, is_prod},
    GroupType,
};

#[tokio::main]
async fn main() {
    dotenv_config();

    // Connect to the database.
    let client = init_postgres().await;

    if is_prod() {
        // Populate all contracts in production.

        let mut contracts = vec![];

        contracts.extend(erc721_contracts().iter().cloned());
        contracts.extend(erc20_contracts().iter().cloned());
        contracts.extend(erc1155_contracts().iter().cloned());

        for contract in contracts {
            upsert_contract(&client, &contract).await.unwrap();
        }
    } else {
        // Only populate few small contracts in development and preview environments.
        let contracts = [
            Contract {
                id: 0,
                address: "0xa9d54f37ebb99f83b603cc95fc1a5f3907aaccfd".to_string(),
                chain: Chain::Mainnet,
                symbol: "pika".to_string(),
                name: "Pikaboss".to_string(),
                deployed_block: 16628745,
                target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
                contract_type: ContractType::ERC20,
            },
            Contract {
                id: 0,
                address: "0x02e7f808990638e9e67e1f00313037ede2362361".to_string(),
                chain: Chain::Mainnet,
                symbol: "KIBSHI".to_string(),
                name: "KiboShib".to_string(),
                deployed_block: 16140853,
                target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
                contract_type: ContractType::ERC20,
            },
            Contract {
                id: 0,
                address: "0x5Af0D9827E0c53E4799BB226655A1de152A425a5".to_string(),
                symbol: "MIL".to_string(),
                name: "Milady".to_string(),
                chain: Chain::Mainnet,
                deployed_block: 13090020,
                target_groups: vec![GroupType::AllHolders],
                contract_type: ContractType::ERC721,
            },
            Contract {
                id: 0,
                address: "0xa0c05e2eed05912d9eb76d466167628e8024a708".to_string(),
                symbol: "ticker".to_string(),
                name: "Ticker".to_string(),
                chain: Chain::Base,
                deployed_block: 11962318,
                target_groups: vec![GroupType::Ticker],
                contract_type: ContractType::ERC20,
            },
            Contract {
                id: 0,
                address: "0xa41273d9ecce19051e109d87431002fb1404d392".to_string(),
                symbol: "crypto-the-game".to_string(),
                name: "Crypto: The Game Players".to_string(),
                chain: Chain::Base,
                deployed_block: 11088633,
                target_groups: vec![GroupType::AllHolders],
                contract_type: ContractType::ERC1155,
            },
        ];

        for contract in &contracts {
            upsert_contract(&client, contract).await.unwrap();
        }
    }
}

use num_bigint::BigUint;

pub mod contract;
pub mod contract_event_iterator;
pub mod contracts;
pub mod eth_rpc;
pub mod event;
pub mod log_sync_engine;
pub mod postgres;
pub mod processors;
pub mod rocksdb_key;
pub mod tree;
pub mod tree_sync_engine;
pub mod utils;

#[cfg(test)]
pub mod test_utils;

use postgres_types::{FromSql, ToSql};

// Define the types for the RocksDB key and value

/// ID of a contract event
pub type EventId = u16;

/// Contract id defined in the Postgres database
pub type ContractId = u16;

/// A chunk number is a number that represents a range of 2000 blocks.
/// It's counted from the block the contract was deployed. (Chunk numbers are contract specific)
pub type ChunkNum = u64;

/// Block number
pub type BlockNum = u64;

/// Index of a log in a block
pub type LogIndex = u32;

/// Index of a transaction in a block
pub type TxIndex = u32;

/// 20byte Ethereum address
pub type Address = [u8; 20];

pub const ROCKSDB_PATH: &str = "./db";

#[derive(Debug)]
pub enum Error {
    RocksDB(rocksdb::Error),
    Postgres(tokio_postgres::Error),
    Std(std::io::Error),
}

impl From<rocksdb::Error> for Error {
    fn from(e: rocksdb::Error) -> Self {
        Error::RocksDB(e)
    }
}

impl From<tokio_postgres::Error> for Error {
    fn from(e: tokio_postgres::Error) -> Self {
        Error::Postgres(e)
    }
}

impl From<std::io::Error> for Error {
    fn from(e: std::io::Error) -> Self {
        Error::Std(e)
    }
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, FromSql, ToSql)]
#[postgres(name = "GroupType")]
pub enum GroupType {
    Static,
    EarlyHolder,
    Whale,
    AllHolders,
    Ticker,
}

#[derive(Debug, Clone)]
pub struct ERC20TransferEvent {
    pub from: Address,
    pub to: Address,
    pub value: BigUint,
}

#[derive(Debug, Clone)]
pub struct ERC721TransferEvent {
    pub from: Address,
    pub to: Address,
    pub token_id: BigUint,
}

#[derive(Debug, Clone)]
pub struct ERC1155TransferSingleEvent {
    pub from: Address,
    pub to: Address,
    pub id: BigUint,
}

#[derive(Debug, Clone)]
pub struct ERC1155TransferBatchEvent {
    pub from: Address,
    pub to: Address,
    pub ids: Vec<BigUint>,
    pub values: Vec<BigUint>,
}

pub mod erc20_transfer_event {
    include!(concat!(env!("OUT_DIR"), "/erc20_transfer_event.rs"));
}

pub mod erc721_transfer_event {
    include!(concat!(env!("OUT_DIR"), "/erc721_transfer_event.rs"));
}

pub mod erc1155_transfer_event {
    include!(concat!(env!("OUT_DIR"), "/erc1155_transfer_event.rs"));
}

pub mod merkle_tree_proto {
    include!(concat!(env!("OUT_DIR"), "/merkle_tree_proto.rs"));
}

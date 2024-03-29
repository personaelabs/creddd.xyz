use std::io::Result;
fn main() -> Result<()> {
    prost_build::compile_protos(
        &[
            "../protobufs/schemas/erc20_transfer_event.proto",
            "../protobufs/schemas/erc721_transfer_event.proto",
            "../protobufs/schemas/erc1155_transfer_event.proto",
            "../protobufs/schemas/merkle_tree.proto",
        ],
        &["../protobufs/schemas"],
    )?;
    Ok(())
}

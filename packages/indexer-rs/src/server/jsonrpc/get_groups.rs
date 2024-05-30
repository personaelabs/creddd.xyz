use super::GroupData;
use crate::GroupType;
use jsonrpc_http_server::jsonrpc_core::*;
use serde_json::json;

pub async fn get_groups(_params: Params, pg_client: &tokio_postgres::Client) -> Result<Value> {
    let rows = pg_client
        .query(
            r#"
            SELECT
                "id",
                "displayName",
                "typeId"
            FROM
                "Group"
            WHERE
                state = 'Recordable'
            "#,
            &[],
        )
        .await
        .unwrap();

    let groups = rows
        .iter()
        .map(|row| {
            let id: String = row.get("id");
            let display_name: String = row.get("displayName");
            let type_id: GroupType = row.get("typeId");

            GroupData {
                id,
                display_name,
                type_id: type_id as GroupType,
            }
        })
        .collect::<Vec<GroupData>>();

    Ok(json!(groups))
}
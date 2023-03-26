use crate::db::operations::connect;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Clone, Serialize)]
pub struct KanbanTicket {
    #[serde(rename = "id")]
    pub id: Option<i32>,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
}

impl KanbanTicket {
    pub fn read() -> Vec<KanbanTicket> {
        let conn = connect();
        let mut stmt = conn.prepare("SELECT * FROM kanbantickets").unwrap();

        let rows = stmt
            .query_map([], |row| {
                Ok(KanbanTicket {
                    id: row.get(0)?,
                    created_at: row.get(1)?,
                    title: row.get(2)?,
                    content: row.get(3)?,
                })
            })
            .unwrap();

        let mut result = Vec::new();

        for row in rows {
            if let Ok(row) = row {
                result.push(row);
            }
        }
        return result;
    }
}

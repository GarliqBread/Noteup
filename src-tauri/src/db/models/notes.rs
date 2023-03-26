use crate::db::operations::connect;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Clone, Serialize)]
pub struct Note {
    #[serde(rename = "id")]
    pub id: Option<i32>,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
}

impl Note {
    pub fn read() -> Vec<Note> {
        let conn = connect();
        let mut stmt = conn.prepare("SELECT * FROM notes").unwrap();

        let rows = stmt
            .query_map([], |row| {
                Ok(Note {
                    id: row.get(0)?,
                    created_at: row.get(1)?,
                    title: row.get(2)?,
                    content: row.get(3)?,
                })
            })
            .unwrap();

        let mut results = Vec::new();

        for row in rows {
            if let Ok(row) = row {
                results.push(row);
            }
        }
        return results;
    }
}

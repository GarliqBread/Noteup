use crate::db::connect;
use rusqlite::{Batch, Result};

pub fn run_migrations() -> i8 {
    println!("Running migrations");
    let initial_tables_result = create_initial_tables();
    let _resut = match initial_tables_result {
        Ok(_result) => return 1,
        Err(error) => panic!("Problem with migrations: {:?}", error),
    };
}

fn create_initial_tables() -> Result<()> {
    let sql = "
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS kanbantickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS proscons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        pros TEXT,
        cons TEXT
    );
    ";
    let conn = connect();
    let mut batch = Batch::new(&conn, sql);

    while let Some(mut stmt) = batch.next()? {
        stmt.execute([])?;
    }
    Ok(())
}

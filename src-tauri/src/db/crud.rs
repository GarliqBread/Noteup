#![allow(dead_code)]

use crate::db::{connect, get_model_fields_information, get_model_fields_information_for_update};
use rusqlite::ToSql;
use serde_json::Value;

pub fn create(table: String, model_data: Value) -> i64 {
    let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
    let query = format!("INSERT INTO {table} ({fields}) VALUES ({fields_numbers});"); // RETURNING ROWID
    return execute_query(query, fields_values);
}

fn execute_query(query: String, fields_values: Vec<String>) -> i64 {
    let final_values: Vec<&dyn ToSql> = fields_values
        .iter()
        .map(|value| value as &dyn ToSql)
        .collect();
    let connection = connect();
    let (message, result) = match connection.execute(&query, &final_values[..]) {
        Ok(inserted) => (
            println!("{} rows were created", inserted),
            connection.last_insert_rowid(),
        ),
        Err(err) => (println!("insert failed: {}", err), 0),
    };
    return result;
}

pub fn update(table: String, model_data: Value, id: i16) -> i16 {
    let fields_names = get_model_fields_information_for_update(model_data);
    let connection = connect();
    let (message, result) = match connection.execute(
        &format!("UPDATE {table} SET {fields_names} WHERE id = {id}"),
        (),
    ) {
        Ok(updated) => (println!("{} rows were updated", updated), id),
        Err(err) => (println!("update failed: {}", err), 0),
    };
    return result;
}

pub fn delete(table: String, id: i16) -> i16 {
    let connection = connect();
    let (message, result) =
        match connection.execute(&format!("DELETE FROM {table} WHERE id = {id}"), ()) {
            Ok(deleted) => (println!("{} rows were deleted", deleted), id),
            Err(err) => (println!("delete failed: {}", err), 0),
        };
    return result;
}

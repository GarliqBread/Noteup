use crate::db::{create, delete, update, KanbanTicket, Note, ProsCons};
use serde_json::{from_str, Value};

#[tauri::command]
pub fn handle_create(table: String, model_data: String) -> i64 {
    let result: Value = from_str(model_data.as_str()).unwrap();
    return create(table, result).into();
}

#[tauri::command]
pub fn handle_update(table: String, model_data: String, id: i16) -> i16 {
    let result: Value = from_str(model_data.as_str()).unwrap();
    return update(table, result, id).into();
}

#[tauri::command]
pub fn handle_delete(table: String, id: i16) -> i16 {
    return delete(table, id).into();
}

#[tauri::command]
pub fn handle_read_notes() -> Vec<Note> {
    return Note::read().into();
}

#[tauri::command]
pub fn handle_read_proscons() -> Vec<ProsCons> {
    return ProsCons::read().into();
}

#[tauri::command]
pub fn handle_read_kanbantickets() -> Vec<KanbanTicket> {
    return KanbanTicket::read().into();
}

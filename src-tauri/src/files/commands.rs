use crate::files::crud::read_dir;
use serde_json::Value;

#[tauri::command]
pub fn show_files(directory: String) -> Vec<Value> {
    let paths_to_show: Vec<Value> = read_dir(directory);
    paths_to_show.into()
}

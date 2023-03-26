#![allow(dead_code)]

use serde_json::{json, Value};
use std::fs::File;
use std::io::prelude::*;
use std::io::ErrorKind;

pub fn handle_settings() {
    // TODO finish that
    let (file, created) = get_or_create_settings();
    let _json_settings: serde_json::Value =
        serde_json::from_reader(file).expect("file should be proper JSON");
}

pub fn settings_on_init() {
    let (file, created) = get_or_create_settings();
    if created {
        create_initial_settings(file);
    };
}

fn create_initial_settings(mut file: File) {
    let settings = json!(
        { 
            "theme": "dark", 
            "apps": ["kanban", "alias", "notes", "schedule", "proscons"],
        }
    );
    file.write_all(serde_json::to_string_pretty(&settings).unwrap().as_bytes());
}

fn get_or_create_settings() -> (File, bool) {
    let file_open_result = File::open("./settings.json");

    let (settings_file, created) = match file_open_result {
        Ok(file) => (file, false),
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("./settings.json") {
                Ok(fc) => (fc, true),
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening the file: {:?}", other_error);
            }
        },
    };
    return (settings_file, created);
}

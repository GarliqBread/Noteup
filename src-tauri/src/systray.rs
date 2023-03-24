use serde::Serialize;
use std::process::Command;
#[cfg(target_os = "linux")]
use std::{fs::metadata, path::PathBuf};
// Manager is used by .get_window
use tauri::{
    self, CustomMenuItem, Manager, SystemTray, SystemTrayMenu, SystemTrayMenuItem,
    SystemTraySubmenu,
};

#[derive(Clone, Serialize)]
pub struct SingleInstancePayload {
    args: Vec<String>,
    cwd: String,
}

#[derive(Clone, Serialize)]
pub struct SystemTrayPayload {
    pub message: String,
}

pub enum TrayState {
    NotPlaying,
    Paused,
    Playing,
}

#[derive(Debug, Default, Serialize)]
struct Example<'a> {
    #[serde(rename = "Attribute 1")]
    attribute_1: &'a str,
}

// useful if not saving the window state
#[tauri::command]
fn show_main_window(window: tauri::Window) {
    window.get_window("main").unwrap().show().unwrap(); // replace "main" by the name of your window
}

fn create_tray_menu(lang: String) -> SystemTrayMenu {
    // TODO: https://docs.rs/rust-i18n/latest/rust_i18n/
    // untested, not sure if the macro accepts dynamic languages
    // ENTER rust_i18n::set_locale(lang) IF LOCAL=lang DOES NOT COMPILE
    SystemTrayMenu::new()
    // .add_item("id".into(), t!("Label", locale = lang))
    // .add_item("id".into(), t!("Label")
    // .add_submenu("Submenu")
    // .add_native_item(item)
}

#[tauri::command]
#[allow(unused_must_use)]
fn update_tray_lang(app_handle: tauri::AppHandle, lang: String) {
    let tray_handle = app_handle.tray_handle();
    tray_handle.set_menu(create_tray_menu(lang));
}

#[tauri::command]
fn process_file(filepath: String) -> String {
    println!("Processing file: {}", filepath);
    "Hello from Rust!".into()
}

// TODO: organize better
#[tauri::command]
fn show_in_folder(path: String) {
    #[cfg(target_os = "windows")]
    {
        Command::new("explorer")
            .args(["/select,", &path]) // The comma after select is not a typo
            .spawn()
            .unwrap();
    }

    #[cfg(target_os = "linux")]
    {
        if path.contains(",") {
            // see https://gitlab.freedesktop.org/dbus/dbus/-/issues/76
            let new_path = match metadata(&path).unwrap().is_dir() {
                true => path,
                false => {
                    let mut path2 = PathBuf::from(path);
                    path2.pop();
                    path2.into_os_string().into_string().unwrap()
                }
            };
            Command::new("xdg-open").arg(&new_path).spawn().unwrap();
        } else {
            Command::new("dbus-send")
                .args([
                    "--session",
                    "--dest=org.freedesktop.FileManager1",
                    "--type=method_call",
                    "/org/freedesktop/FileManager1",
                    "org.freedesktop.FileManager1.ShowItems",
                    format!("array:string:\"file://{path}\"").as_str(),
                    "string:\"\"",
                ])
                .spawn()
                .unwrap();
        }
    }

    #[cfg(target_os = "macos")]
    {
        Command::new("open").args(["-R", &path]).spawn().unwrap();
    }
}

pub fn base_tray() -> SystemTray {
    let tray_menu_en = SystemTrayMenu::new()
        // https://docs.rs/tauri/1.2.2/tauri/struct.SystemTraySubmenu.html
        .add_submenu(SystemTraySubmenu::new(
            "Sub Menu!",
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new(
                    "bf-sep".to_string(),
                    "Before Separator",
                ))
                // https://docs.rs/tauri/1.2.2/tauri/enum.SystemTrayMenuItem.html
                .add_native_item(SystemTrayMenuItem::Separator)
                .add_item(CustomMenuItem::new("af-sep".to_string(), "After Separator")),
        ))
        // https://docs.rs/tauri/1.2.2/tauri/struct.CustomMenuItem.html#
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"))
        .add_item(CustomMenuItem::new(
            "toggle-visibility".to_string(),
            "Hide Window",
        ))
        .add_item(CustomMenuItem::new(
            "toggle-tray-icon".to_string(),
            "Toggle the tray icon",
        ));
    // https://docs.rs/tauri/1.2.2/tauri/struct.SystemTray.html
    let system_tray = SystemTray::new()
        .with_menu(tray_menu_en)
        .with_id("main-tray");

    return system_tray;
}

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use db::{
    handle_create, handle_delete, handle_read_kanbantickets, handle_read_notes,
    handle_read_proscons, handle_update, run_migrations,
};
use files::{settings_on_init, show_files};
use menus::get_menu;
use std::sync::Mutex;
use systray::{base_tray, SystemTrayPayload, TrayState};
use tauri::{self, Manager, SystemTrayEvent};
mod db;
mod files;
mod menus;
mod systray;

fn main() {
    tauri::Builder::default()
        .system_tray(base_tray())
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                let main_window = app.get_window("main").unwrap();
                main_window
                    .emit(
                        "system-tray",
                        SystemTrayPayload {
                            message: id.clone(),
                        },
                    )
                    .unwrap();
                let item_handle = app.tray_handle().get_item(&id);
                match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "toggle-tray-icon" => {
                        let tray_state_mutex = app.state::<Mutex<TrayState>>();
                        let mut tray_state = tray_state_mutex.lock().unwrap();
                        match *tray_state {
                            TrayState::NotPlaying => {
                                app.tray_handle()
                                    .set_icon(tauri::Icon::Raw(
                                        include_bytes!("../icons/icon.ico").to_vec(),
                                    ))
                                    .unwrap();
                                *tray_state = TrayState::Playing;
                            }
                            TrayState::Playing => {
                                app.tray_handle()
                                    .set_icon(tauri::Icon::Raw(
                                        include_bytes!("../icons/icon.ico").to_vec(),
                                    ))
                                    .unwrap();
                                *tray_state = TrayState::NotPlaying;
                            }
                            TrayState::Paused => {}
                        };
                    }
                    "toggle-visibility" => {
                        // update menu item example
                        if main_window.is_visible().unwrap() {
                            main_window.hide().unwrap();
                            item_handle.set_title("Show Window").unwrap();
                        } else {
                            main_window.show().unwrap();
                            item_handle.set_title("Hide Window").unwrap();
                        }
                    }
                    _ => {}
                }
            }
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let main_window = app.get_window("main").unwrap();
                main_window
                    .emit(
                        "system-tray",
                        SystemTrayPayload {
                            message: "left-click".into(),
                        },
                    )
                    .unwrap();
                println!("system tray received a left click");
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a double click");
            }
            _ => {}
        })
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
            // we perform the initialization code on a new task so the app doesn't freeze
            tauri::async_runtime::spawn(async move {
                // initialize your app here instead of sleeping :)
                println!("Initializing...");
                run_migrations();
                settings_on_init();
                std::thread::sleep(std::time::Duration::from_secs(2));
                println!("Done initializing.");

                // After it's done, close the splashscreen and display the main window
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
            });
            Ok(())
        })
        .menu(get_menu())
        .invoke_handler(tauri::generate_handler![
            handle_create,
            handle_update,
            handle_delete,
            handle_read_notes,
            handle_read_proscons,
            handle_read_kanbantickets,
            show_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

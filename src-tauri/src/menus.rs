use tauri::{AboutMetadata, Menu, MenuItem, Submenu};

pub fn get_menu() -> Menu {
    let todo = Submenu::new(
        "File",
        Menu::new()
            .add_native_item(MenuItem::About(String::from("Todo"), AboutMetadata::new()))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    );

    let edit = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::SelectAll),
    );

    let view = Submenu::new(
        "View",
        Menu::new()
            .add_native_item(MenuItem::EnterFullScreen)
            .add_native_item(MenuItem::Minimize),
    );

    let help = Submenu::new(
        "Help",
        Menu::new()
            .add_native_item(MenuItem::EnterFullScreen)
            .add_native_item(MenuItem::Minimize),
    );

    let menu = Menu::new()
        .add_submenu(todo)
        .add_submenu(edit)
        .add_submenu(view)
        .add_submenu(help);

    menu
}

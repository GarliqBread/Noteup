#![allow(dead_code)]

use serde_json::{json, Value};
use std::ffi::OsString;
use std::fs;
use std::fs::{DirEntry, ReadDir};



pub fn read_dir(path: String) -> Vec<Value> {
    let paths: ReadDir = fs::read_dir(path).unwrap();

    let mut paths_to_show: Vec<Value> = Vec::new();

    for path in paths {
        if let Ok(path) = path {
            let path_to_save = build_path_json(path);
            paths_to_show.push(path_to_save);
        }
    }
    return paths_to_show;
}

fn build_path_json(path: DirEntry) -> Value {
    let (full_path, file_name) = files_to_string(path);
    return json!({
      "fullPath": full_path,
      "title": file_name
    });
}

fn files_to_string(path: DirEntry) -> (String, String) {
    let full_path: String = path.path().display().to_string();
    let path_file_name: Result<String, OsString> = path.file_name().into_string();
    let file_name = match path_file_name {
        Ok(res) => res,
        Err(_err) => get_last_string(full_path.split('/').collect::<Vec<&str>>()),
    };
    return (full_path, file_name);
}

fn get_last_string(strings: Vec<&str>) -> String {
    let final_string: &str = "";
    if let Some(val) = strings.last() {
        let _final_string = val;
    }
    return final_string.to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    // #[test]
    // fn test_build_path_json() {
    //     let temp = TestDir::temp().create("test/dir", FileType::Dir);

    //     let path: PathBuf = temp.path("test/random_file");
    //     assert_eq!(4, build_path_json(path));
    // }
    // #[test]
    // fn test_files_to_string() {
    //     let path = DirEntry::new("");
    //     assert_eq!(4, files_to_string(path));
    // }
    #[test]
    fn test_get_last_string() {
        let strings = ["hey", "that's", "cool"];
        assert_eq!("cool", get_last_string(strings.to_vec()));
        assert_eq!("", get_last_string([].to_vec()));
    }
}

use crate::src::files::crud;

#[test]
fn test_read_dir() {
    assert_eq!(4, crud::read_dir(2));
}

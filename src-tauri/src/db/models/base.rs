pub trait BaseModel {
    type QuerySet;

    fn read(&self) -> Vec<Self::QuerySet>;
}

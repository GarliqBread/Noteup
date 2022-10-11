export enum Folder {
  ALL = "ALL",
  CATEGORY = "CATEGORY",
  PINNED = "PINNED",
  TRASH = "TRASH",
}

export enum Section {
  MENU = "MENU",
  LIST = "LIST",
  NOTE = "NOTE",
}

export enum Shortcuts {
  NEW_NOTE = "ctrl+alt+n",
  NEW_CATEGORY = "ctrl+alt+c",
  DELETE_NOTE = "ctrl+alt+u",
  DOWNLOAD_NOTES = "ctrl+alt+o",
  PREVIEW = "alt+ctrl+p",
  TOGGLE_THEME = "alt+ctrl+k",
  SEARCH = "alt+ctrl+f",
}

export enum ContextMenuEnum {
  CATEGORY = "CATEGORY",
  NOTE = "NOTE",
}

export enum NotesSortKey {
  LAST_UPDATED = "lastUpdated",
  TITLE = "title",
  CREATED_DATE = "created_date",
}

export enum EditorThemeKey {
  GITHUB = "github",
  XCODE = "xcode",
  DUOTONE = "duotone",
}

export enum PreviewThemeKey {
  COLDDARK = "colddark",
  ONE = "one",
  DUOTONE = "duotone",
  VS = "vs",
}

export enum LabelText {
  ADD_CATEGORY = "Add category",
  COLLAPSE_CATEGORY = "Collapse Category List",
  NOTES = "Notes",
  CREATE_NEW_NOTE = "Create new note",
  DELETE_PERMANENTLY = "Delete permanently",
  DOWNLOAD = "Download",
  PINNED = "Pinned",
  MARK_AS_PINNED = "Mark as pinned",
  MOVE_TO_TRASH = "Move to trash",
  NEW_CATEGORY = "New category...",
  NEW_NOTE = "New note",
  REMOVE_CATEGORY = "Remove category",
  REMOVE_FAVORITE = "Remove favorite",
  MOVE_CATEGORY = "Move category",
  RESTORE_FROM_TRASH = "Restore from trash",
  SETTINGS = "Settings",
  SYNC_NOTES = "Sync notes",
  TRASH = "Trash",
  RENAME = "Rename category",
  DOWNLOAD_ALL_NOTES = "Download all notes",
  BACKUP_ALL_NOTES = "Export backup",
  IMPORT_BACKUP = "Import backup",
  TOGGLE_PINNED = "Toggle pinned",
  COPY_REFERENCE_TO_NOTE = "Copy reference",
}

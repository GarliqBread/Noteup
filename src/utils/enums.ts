export enum Folder {
  ALL = "ALL",
  CATEGORY = "CATEGORY",
  PINNED = "PINNED",
  SCRATCH = "SCRATCH",
  TRASH = "TRASH",
}

export enum Shortcuts {
  NEW_NOTE = "ctrl+alt+n",
  NEW_CATEGORY = "ctrl+alt+c",
  DELETE_NOTE = "ctrl+alt+u",
  SYNC_NOTES = "ctrl+alt+l",
  DOWNLOAD_NOTES = "ctrl+alt+o",
  PREVIEW = "alt+ctrl+p",
  TOGGLE_THEME = "alt+ctrl+k",
  SEARCH = "alt+ctrl+f",
  PRETTIFY = "ctrl+alt+i",
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

export enum Errors {
  INVALID_LINKED_NOTE_ID = "<invalid note id provided>",
}

export enum LabelText {
  ADD_CATEGORY = "Add category",
  COLLAPSE_CATEGORY = "Collapse Category List",
  NOTES = "Notes",
  CREATE_NEW_NOTE = "Create new note",
  DELETE_PERMANENTLY = "Delete permanently",
  DOWNLOAD = "Download",
  FAVORITES = "Favorites",
  SCRATCHPAD = "Scratchpad",
  MARK_AS_FAVORITE = "Mark as favorite",
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
  WELCOME_TO_NOTEUP = "Welcome to Noteup!",
  RENAME = "Rename category",
  ADD_CONTENT_NOTE = "Please add content to this new note to access the menu options.",
  DOWNLOAD_ALL_NOTES = "Download all notes",
  BACKUP_ALL_NOTES = "Export backup",
  IMPORT_BACKUP = "Import backup",
  TOGGLE_FAVORITE = "Toggle favorite",
  COPY_REFERENCE_TO_NOTE = "Copy reference to note",
}

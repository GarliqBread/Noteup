import { EditorThemeKey, Folder, NotesSortKey, PreviewThemeKey, Section } from "utils/enums";

export const folderMap: Record<Folder, string> = {
  [Folder.ALL]: "All Notes",
  [Folder.PINNED]: "Pinned",
  [Folder.TRASH]: "Trash",
  [Folder.CATEGORY]: "Category",
};

export const shortcutMap = [
  { action: "Create a new note", key: "N" },
  { action: "Delete a note", key: "U" },
  { action: "Create a category", key: "C" },
  { action: "Download a note", key: "O" },
  { action: "Markdown preview", key: "P" },
  { action: "Toggle theme", key: "K" },
  { action: "Search notes", key: "F" },
];

export const notesSortOptions = [
  { value: NotesSortKey.TITLE, label: "Title" },
  { value: NotesSortKey.CREATED_DATE, label: "Date Created" },
  { value: NotesSortKey.LAST_UPDATED, label: "Last Updated" },
];

export const themeEditorOptions = [
  { value: EditorThemeKey.GITHUB, label: "Github" },
  { value: EditorThemeKey.XCODE, label: "Xcode" },
  { value: EditorThemeKey.DUOTONE, label: "Duotone" },
];

export const themePreviewOptions = [
  { value: PreviewThemeKey.DUOTONE, label: "Duotone" },
  { value: PreviewThemeKey.COLDDARK, label: "Cold Dark" },
  { value: PreviewThemeKey.VS, label: "Visual Studio" },
  { value: PreviewThemeKey.ONE, label: "One" },
];

export const navHeaders = {
  [Section.LIST]: {
    [Folder.ALL]: "All notes",
    [Folder.PINNED]: "Pinned notes",
    [Folder.TRASH]: "Trashed notes",
    [Folder.CATEGORY]: "Category notes",
  },
  [Section.NOTE]: {
    editing: "Editing note",
    "not-editing": "Preview note",
  },
  [Section.MENU]: "",
};

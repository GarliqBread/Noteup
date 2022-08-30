import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

import { EditorThemeKey, Folder, NotesSortKey, PreviewThemeKey } from "utils/enums";

export const folderMap: Record<Folder, string> = {
  [Folder.ALL]: "All Notes",
  [Folder.PINNED]: "Pinned",
  [Folder.SCRATCH]: "Scratch Paper",
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

export const routes = {
  FAVORITES: "/shared/",
};

export const defaultScratchPaper = {
  scratchpad: true,
  id: uuid(),
  text: "",
  created: dayjs().format(),
  lastUpdated: dayjs().format(),
};

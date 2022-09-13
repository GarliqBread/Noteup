import { EditorThemeKey, Folder, NotesSortKey, PreviewThemeKey, Section } from "@/utils/enums";

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

export const defaultNote = {
  id: "default-note",
  text: '# Welcome to Noteup!\n\nNoteup is a free, open-source notes app for the web and desktop. Your notes are saved in local storage and will not be permanently persisted, but are available for download.\n\nView the source on [Gitlab](https://git.elements.nl/claudio.silva/noteup).\n\n## Features\n\n- **Plain text notes** - take notes in an IDE-like environment that makes no assumptions\n- **Markdown preview** - view rendered HTML\n- **Split screen editing** - render markdown while you edit it\n- **Linked notes** - use `{ {uuid} }` syntax to link to notes within other notes\n- **Syntax highlighting** \n\nSeveral theme options available through the settings menu.\n\n- **Keyboard shortcuts** - use the keyboard for all common tasks - creating notes and categories, toggling settings, and other options\n- **Multi-cursor editing** - supports multiple cursors and other [Codemirror](https://codemirror.net/) options\n- **Search notes** - easily search all notes, or notes within a category\n- **No WYSIWYG** - made for developers, by developers\n- **No database** - notes are only stored in the browser\'s local storage and are available for download and export to you alone\n- **No tracking or analytics**\n\nEasily insert your code blocks into your notes\n\n```js\n// js\nconst text = "This is a string";\n\nconst isTextANumber = !!isNan(text);\n```\n\n```python\n# python\nfact = "JavaScript is amazing!"\n\nprint(fact)\n```\n\n\n',
  created: "",
  lastUpdated: "",
};

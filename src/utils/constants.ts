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

export const emptyListMessage = {
  [Folder.ALL]: "- No notes -",
  [Folder.PINNED]: "- No pinned notes -",
  [Folder.TRASH]: "- Trash is empty -",
  [Folder.CATEGORY]: "- Empty category -",
};

export const defaultNote = {
  id: "default-note",
  text: '# Welcome to Noteup!\n\nNoteup is a free, open-source GitHub-flavored markdown note-taking app for the web, mobile(PWA) and desktop. Your notes are saved in the local storage but are available for download.\n\nView the source on [Github](https://github.com/elementsinteractive/Noteup).\n\n## Features\n\n- **Plain text notes** - take notes in an IDE-like environment\n- **Markdown preview** - view rendered HTML\n- **Split screen editing** - preview the markdown while you edit it\n- **Linked notes** - use {{uuid}} syntax to link to notes within other notes\n- **Syntax highlighting** \n\nSeveral theme options are available through the settings menu.\n\n- **Keyboard shortcuts** - use the keyboard for all common tasks - creating notes and categories, toggling settings, and other options\n- **Multi-cursor editing** - supports multiple cursors and other [Codemirror](https://codemirror.net/) options\n- **Search notes** - easily search all notes or notes within a category\n- **No tracking or analytics**\n\nEasily insert your code blocks into your notes\n\n```js\nconst text = "This is a string";\n\nconsole.log(text);\n```\n\n```python\nfact = "JavaScript is amazing!"\n\nprint(fact)\n```\n\n## Roadmap\n\n- [x] Tandem scroll for side-by-side editing\n- [x] Quick command bar (WYSIWYG style)\n- [x] Add a landing page\n- [ ] Add a page with markdown help commands\n- [ ] Note sharing\n- [ ] Account sync\n- [ ] Cross-platform sync\n- [x] Extra download options (like `.pdf`)\n\n\n\n',
  created: "2022-10-10",
  lastUpdated: "2022-10-11",
};

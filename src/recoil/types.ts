import { NotesSortKey, PreviewThemeKey, Section } from "@/utils/enums";

type EditorTheme = "github" | "xcode" | "duotone";

export type Note = {
  id?: string;
  tempId?: string;
  text: string;
  created: string;
  lastUpdated: string;
  categoryId?: string;
  deleted?: boolean;
  trash?: boolean;
  pinned?: boolean;
  synced: boolean;
  toSync: boolean;
};

export type Category = {
  id: string;
  name: string;
};

export type NotesState = {
  notes: Note[];
  keyword: string;
  sortBy: keyof NotesSortKey;
  selectedNoteId: string | null;
};

export type CategoryState = {
  categories: Category[];
  selectedCategoryId: string | null;
  categoryListOpen: boolean;
};

export type SettingsState = {
  theme: "light" | "dark";
  notesSortKey: NotesSortKey;
};

export type EditorState = {
  autoComplete: boolean;
  breakLines: boolean;
  lineNumbers: boolean;
  foldGutter: boolean;
  editorTheme: EditorTheme;
  previewerTheme: PreviewThemeKey;
  renderHTML: boolean;
  editing: boolean;
  split: boolean;
  toolbar: boolean;
};

export type SectionsState = Section;

export type AuthState = {
  token?: string;
  refreshToken?: string;
  username?: string;
  apiURL: string;
};

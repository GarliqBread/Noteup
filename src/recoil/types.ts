import { NotesSortKey } from "utils/enums";

type EditorTheme = "github" | "xcode" | "duotone";

export type Note = {
  id: string;
  text: string;
  created: string;
  lastUpdated: string;
  /**
   * Refers to the category UUID and not the actual name.
   */
  categoryId?: string;
  scratchpad?: boolean;
  deleted?: boolean;
  trash?: boolean;
  pinned?: boolean;
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
};

export type SettingsState = {
  theme: "light" | "dark";
  notesSortKey: NotesSortKey;
  autoComplete: boolean;
  breakLines: boolean;
  lineNumbers: boolean;
  foldGutter: boolean;
  editorTheme: EditorTheme;
};

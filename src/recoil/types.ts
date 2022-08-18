import { Folder, NotesSortKey } from "utils/enums";

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
  trash?: boolean;
  pinned?: boolean;
};

export type Category = {
  id: string;
  name: string;
};

export type NotesState = {
  notes: Note[];
  categories: Category[];
  sortBy: keyof NotesSortKey;
  route: keyof typeof Folder;
  selectedNoteId: string | null;
  activeFolder: Folder;
  selectedCategoryId: string | null;
};

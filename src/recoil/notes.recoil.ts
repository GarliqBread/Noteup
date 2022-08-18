import { RecoilState, atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Folder, NotesSortKey } from "utils/enums";

import { NotesState } from "./types";

const { persistAtom } = recoilPersist();

export const notesState: RecoilState<NotesState> = atom({
  key: "notes-state",
  default: {
    activeFolder: Folder.ALL,
    notes: [
      {
        id: 1,
        text: "Nullam iaculis enim in est dictum interdum. Sed eget.",
      },
      {
        id: 2,
        text: "Nulla lectus justo, facilisis sit amet ligula quis, vehicula.",
      },
      {
        id: 3,
        text: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
        trash: true,
      },
      {
        id: 4,
        text: "There is no one who loves pain itself, who seeks after it and wants to have it",
        pinned: true,
      },
    ],
    categories: [],
    sortBy: NotesSortKey.LAST_UPDATED,
    route: Folder.ALL,
    selectedNoteId: null,
    selectedCategoryId: null,
  },
  effects_UNSTABLE: [persistAtom],
});

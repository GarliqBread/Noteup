import dayjs from "dayjs";
import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Folder, NotesSortKey } from "utils/enums";
import { getNoteTitle } from "utils/helpers";
import { getNotesSorter } from "utils/sorting";

import { selectedCategorySelector } from "./categories.recoil";
import { folderState } from "./folder.recoil";
import { notesSortKeySelector } from "./settings.recoil";
import { Note, NotesState } from "./types";

const { persistAtom } = recoilPersist();

export const notesState: RecoilState<NotesState> = atom({
  key: "notes-state",
  default: {
    keyword: "",
    notes: [],
    sortBy: NotesSortKey.LAST_UPDATED,
    selectedNote: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const filteredNotesSelector = selector({
  key: "filtered-notes",
  get: ({ get }) => {
    const { notes, keyword } = get(notesState);
    const selectedCategoryId = get(selectedCategorySelector);
    const activeFolder = get(folderState);
    const notesSortKey = get(notesSortKeySelector);
    const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

    const filter: Record<Folder, (note: Note) => boolean> = {
      [Folder.CATEGORY]: (note) => !note.trash && note.categoryId === selectedCategoryId,
      [Folder.SCRATCH]: (note) => !!note.scratchpad,
      [Folder.PINNED]: (note) => !note.trash && !!note.pinned,
      [Folder.TRASH]: (note) => !!note.trash,
      [Folder.ALL]: (note) => !note.trash && !note.scratchpad,
    };

    return notes
      .filter((note) => !note.deleted)
      .filter(filter[activeFolder])
      .filter((note) => regex.test(getNoteTitle(note.text)))
      .sort(getNotesSorter(notesSortKey));
  },
});

export const selectNoteIdSelector = selector({
  key: "select-note-id",
  get: ({ get }) => get(notesState).selectedNoteId,
  set: ({ set, get }, noteId) => {
    if (noteId instanceof DefaultValue) return;
    set(notesState, {
      ...get(notesState),
      selectedNoteId: noteId,
    });
  },
});

export const selectedNoteSelector = selector({
  key: "selected-note",
  get: ({ get }) => {
    const state = get(notesState);
    return state.notes.find((note) => note.id === state.selectedNoteId);
  },
  set: ({ set, get }, newNote) => {
    if (!newNote || newNote instanceof DefaultValue) return;
    const prevState = get(notesState);
    const newNotes = newNote.deleted
      ? prevState.notes.filter((note) => note.id !== newNote.id)
      : prevState.notes.map((note) =>
          note.id === newNote.id
            ? {
                ...newNote,
                lastUpdated: dayjs().format(),
              }
            : note,
        );
    set(notesState, {
      ...prevState,
      notes: newNotes,
    });
  },
});

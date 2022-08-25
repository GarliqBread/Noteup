import dayjs from "dayjs";
import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { defaultScratchPaper } from "utils/constants";
import { Folder, NotesSortKey } from "utils/enums";
import { getNoteTitle, removeDuplicateNotes } from "utils/helpers";
import { getNotesSorter } from "utils/sorting";

import { selectedCategorySelector } from "./categories.recoil";
import { editingSelector } from "./editor.recoil";
import { activeFolderSelector } from "./folder.recoil";
import { notesSortKeySelector } from "./settings.recoil";
import { Note, NotesState } from "./types";

const { persistAtom } = recoilPersist();

export const notesState: RecoilState<NotesState> = atom({
  key: "notes-state",
  default: {
    keyword: "",
    notes: [defaultScratchPaper],
    sortBy: NotesSortKey.LAST_UPDATED,
    selectedNote: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const notesSelector = selector({
  key: "notes-selector",
  get: ({ get }) => get(notesState).notes,
  set: ({ get, set }, notes) => {
    if (notes instanceof DefaultValue) return;
    const state = get(notesState);
    set(notesState, {
      ...state,
      notes: removeDuplicateNotes([...state.notes, ...notes]),
    });
  },
});

export const filteredNotesSelector = selector({
  key: "filtered-notes",
  get: ({ get }) => {
    const { notes, keyword } = get(notesState);
    const selectedCategoryId = get(selectedCategorySelector);
    const activeFolder = get(activeFolderSelector);
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
  key: "select-note-id-selector",
  get: ({ get }) => get(notesState).selectedNoteId,
  set: ({ set, get }, noteId) => {
    if (noteId instanceof DefaultValue) return;
    set(editingSelector, false);
    set(notesState, {
      ...get(notesState),
      selectedNoteId: noteId,
    });
  },
});

export const selectedNoteSelector = selector({
  key: "selected-note-selector",
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

import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Folder, Section } from "@/utils/enums";
import { getNotesSorter } from "@/utils/sorting";

import { selectedCategoryIdSelector } from "./categories.recoil";
import { notesSelector, selectNoteIdSelector } from "./notes.recoil";
import { sectionsSelector } from "./sections.recoil";
import { sortKeySelector } from "./settings.recoil";

const { persistAtom } = recoilPersist();

export const folderState: RecoilState<Folder> = atom({
  key: "folder-state",
  default: Folder.ALL,
  effects_UNSTABLE: [persistAtom],
});

export const activeFolderSelector = selector({
  key: "active-folder-selector",
  get: ({ get }) => get(folderState),
  set: ({ get, set }, folder) => {
    if (folder instanceof DefaultValue) return;
    const notes = get(notesSelector);
    const sortOrderKey = get(sortKeySelector);
    const categoryId = get(selectedCategoryIdSelector);
    const availableNotes = !sortOrderKey
      ? notes.filter((note) => !note.trash)
      : notes.filter((note) => !note.trash).sort(getNotesSorter(sortOrderKey));

    const firstNote = {
      [Folder.ALL]: () => availableNotes[0],
      [Folder.CATEGORY]: () => availableNotes.find((note) => note.categoryId === categoryId),
      [Folder.PINNED]: () => availableNotes.find((note) => note.pinned),
      [Folder.TRASH]: () => notes.find((note) => note.trash),
    }[folder]();

    set(selectNoteIdSelector, firstNote ? firstNote.id : "");
    set(folderState, folder);
    set(sectionsSelector, Section.LIST);

    if (folder !== Folder.CATEGORY) {
      set(selectedCategoryIdSelector, null);
    }
  },
});

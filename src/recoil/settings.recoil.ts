import { RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { NotesSortKey } from "utils/enums";

import { SettingsState } from "./types";

const { persistAtom } = recoilPersist();

export const settingsState: RecoilState<SettingsState> = atom({
  key: "settings-state",
  default: {
    theme: "light",
    editorTheme: "duotone",
    notesSortKey: NotesSortKey.LAST_UPDATED,
    autoComplete: true,
    breakLines: true,
    foldGutter: false,
    lineNumbers: true,
    indentOnInput: true,
  },
  effects_UNSTABLE: [persistAtom],
});

export const notesSortKeySelector = selector({
  key: "notes-sort-key",
  get: ({ get }) => {
    return get(settingsState).notesSortKey;
  },
});

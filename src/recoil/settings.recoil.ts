import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { NotesSortKey } from "@/utils/enums";

import { SettingsState } from "./types";

const { persistAtom } = recoilPersist();

export const settingsState: RecoilState<SettingsState> = atom({
  key: "settings-state",
  default: {
    theme: "light",
    notesSortKey: NotesSortKey.LAST_UPDATED,
  },
  effects_UNSTABLE: [persistAtom],
});

export const notesSortKeySelector = selector({
  key: "notes-sort-key",
  get: ({ get }) => get(settingsState).notesSortKey,
});

export const themeSelector = selector({
  key: "theme-selector",
  get: ({ get }) => get(settingsState).theme,
  set: ({ get, set }, theme) => {
    if (theme instanceof DefaultValue) return;
    const currentState: SettingsState = get(settingsState);
    set(settingsState, {
      ...currentState,
      theme,
    });
  },
});

export const sortKeySelector = selector({
  key: "sort-key-selector",
  get: ({ get }) => get(settingsState).notesSortKey,
  set: ({ set, get }, sortKey) =>
    !(sortKey instanceof DefaultValue) &&
    set(settingsState, {
      ...get(settingsState),
      notesSortKey: sortKey,
    }),
});

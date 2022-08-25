import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { EditorThemeKey, NotesSortKey } from "utils/enums";

import { SettingsState } from "./types";

const { persistAtom } = recoilPersist();

export const settingsState: RecoilState<SettingsState> = atom({
  key: "settings-state",
  default: {
    theme: "light",
    editorTheme: EditorThemeKey.DUOTONE,
    notesSortKey: NotesSortKey.LAST_UPDATED,
    autoComplete: true,
    breakLines: true,
    foldGutter: false,
    lineNumbers: true,
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

export const autoCompleteSelector = selector({
  key: "auto-complete-selector",
  get: ({ get }) => get(settingsState).autoComplete,
  set: ({ set, get }, autoComplete) =>
    !(autoComplete instanceof DefaultValue) &&
    set(settingsState, {
      ...get(settingsState),
      autoComplete,
    }),
});

export const lineNumbersSelector = selector({
  key: "line-numbers-selector",
  get: ({ get }) => get(settingsState).lineNumbers,
  set: ({ set, get }, lineNumbers) =>
    !(lineNumbers instanceof DefaultValue) &&
    set(settingsState, {
      ...get(settingsState),
      lineNumbers,
    }),
});

export const breakLinesSelector = selector({
  key: "break-line-selector",
  get: ({ get }) => get(settingsState).breakLines,
  set: ({ set, get }, breakLines) =>
    !(breakLines instanceof DefaultValue) &&
    set(settingsState, {
      ...get(settingsState),
      breakLines,
    }),
});

export const foldGutterSelector = selector({
  key: "fold-gutter-selector",
  get: ({ get }) => get(settingsState).foldGutter,
  set: ({ set, get }, foldGutter) =>
    !(foldGutter instanceof DefaultValue) &&
    set(settingsState, {
      ...get(settingsState),
      foldGutter,
    }),
});

export const editorThemeSelector = selector({
  key: "editor-theme-selector",
  get: ({ get }) => get(settingsState).editorTheme,
  set: ({ set, get }, editorTheme) =>
    !(editorTheme instanceof DefaultValue) &&
    set(settingsState, {
      ...get(settingsState),
      editorTheme,
    }),
});

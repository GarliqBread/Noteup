import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { EditorThemeKey, PreviewThemeKey } from "utils/enums";

import { EditorState } from "./types";

const { persistAtom } = recoilPersist();

export const editorState: RecoilState<EditorState> = atom({
  key: "editor-state",
  default: {
    editorTheme: EditorThemeKey.DUOTONE,
    previwerTheme: PreviewThemeKey.DUOTONE,
    autoComplete: true,
    breakLines: true,
    foldGutter: false,
    lineNumbers: true,
    editing: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const editingSelector = selector({
  key: "editor-selector",
  get: ({ get }) => get(editorState).editing,
  set: ({ get, set }, editing) =>
    !(editing instanceof DefaultValue) &&
    set(editorState, {
      ...get(editorState),
      editing,
    }),
});

export const autoCompleteSelector = selector({
  key: "auto-complete-selector",
  get: ({ get }) => get(editorState).autoComplete,
  set: ({ set, get }, autoComplete) =>
    !(autoComplete instanceof DefaultValue) &&
    set(editorState, {
      ...get(editorState),
      autoComplete,
    }),
});

export const lineNumbersSelector = selector({
  key: "line-numbers-selector",
  get: ({ get }) => get(editorState).lineNumbers,
  set: ({ set, get }, lineNumbers) =>
    !(lineNumbers instanceof DefaultValue) &&
    set(editorState, {
      ...get(editorState),
      lineNumbers,
    }),
});

export const breakLinesSelector = selector({
  key: "break-line-selector",
  get: ({ get }) => get(editorState).breakLines,
  set: ({ set, get }, breakLines) =>
    !(breakLines instanceof DefaultValue) &&
    set(editorState, {
      ...get(editorState),
      breakLines,
    }),
});

export const foldGutterSelector = selector({
  key: "fold-gutter-selector",
  get: ({ get }) => get(editorState).foldGutter,
  set: ({ set, get }, foldGutter) =>
    !(foldGutter instanceof DefaultValue) &&
    set(editorState, {
      ...get(editorState),
      foldGutter,
    }),
});

export const editorThemeSelector = selector({
  key: "editor-theme-selector",
  get: ({ get }) => get(editorState).editorTheme,
  set: ({ set, get }, editorTheme) =>
    !(editorTheme instanceof DefaultValue) &&
    set(editorState, {
      ...get(editorState),
      editorTheme,
    }),
});

export const previewerThemeSelector = selector({
  key: "perviewer-theme-selector",
  get: ({ get }) => get(editorState).previwerTheme,
  set: ({ set, get }, previwerTheme) =>
    !(previwerTheme instanceof DefaultValue) &&
    set(editorState, {
      ...get(editorState),
      previwerTheme,
    }),
});

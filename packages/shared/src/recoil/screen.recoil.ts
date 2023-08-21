import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { ScreenState } from "./types";

const { persistAtom } = recoilPersist();

export const screenState: RecoilState<ScreenState> = atom({
  key: "screen-state",
  default: {
    fullScreen: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const fullScreenSelector = selector({
  key: "full-screen-selector",
  get: ({ get }) => get(screenState).fullScreen,
  set: ({ get, set }, fullScreen) => {
    if (fullScreen instanceof DefaultValue) return;
    set(screenState, {
      ...get(screenState),
      fullScreen,
    });
  },
});

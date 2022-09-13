import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Section } from "@/utils/enums";

import { SectionsState } from "./types";

const { persistAtom } = recoilPersist();

export const sectionsState: RecoilState<SectionsState> = atom({
  key: "sections-state",
  default: Section.MENU,
  effects_UNSTABLE: [persistAtom],
});

export const sectionsSelector = selector({
  key: "sections-selector",
  get: ({ get }) => get(sectionsState),
  set: ({ set }, section) => !(section instanceof DefaultValue) && set(sectionsState, section),
});

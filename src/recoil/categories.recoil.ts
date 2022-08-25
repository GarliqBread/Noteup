import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { CategoryState } from "./types";

const { persistAtom } = recoilPersist();

export const categoryState: RecoilState<CategoryState> = atom({
  key: "categories-state",
  default: {
    categories: [],
    selectedCategoryId: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const categoriesSelector = selector({
  key: "categories-selector",
  get: ({ get }) => get(categoryState).categories,
  set: ({ get, set }, categories) =>
    !(categories instanceof DefaultValue) &&
    set(categoryState, {
      ...get(categoryState),
      categories,
    }),
});

export const selectedCategorySelector = selector({
  key: "selected-category-selector",
  get: ({ get }) => get(categoryState).selectedCategoryId,
  set: ({ set, get }, categoryId) =>
    (categoryId === null || typeof categoryId === "string") &&
    set(categoryState, {
      ...get(categoryState),
      selectedCategoryId: categoryId,
    }),
});

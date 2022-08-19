import { RecoilState, atom, selector } from "recoil";
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
  key: "categories",
  get: ({ get }) => get(categoryState).categories,
});

export const selectedCategorySelector = selector({
  key: "selected-categories",
  get: ({ get }) => {
    return get(categoryState).selectedCategoryId;
  },
  set: ({ set, get }, categoryId) =>
    (categoryId === null || typeof categoryId === "string") &&
    set(categoryState, {
      ...get(categoryState),
      selectedCategoryId: categoryId,
    }),
});

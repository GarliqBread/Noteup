import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Folder } from "@/utils/enums";

import { activeFolderSelector } from "./folder.recoil";
import { CategoryState } from "./types";

const { persistAtom } = recoilPersist();

export const categoryState: RecoilState<CategoryState> = atom({
  key: "categories-state",
  default: {
    categories: [],
    selectedCategoryId: null,
    categoryListOpen: true,
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

export const selectedCategoryIdSelector = selector({
  key: "selected-category-id-selector",
  get: ({ get }) => get(categoryState).selectedCategoryId,
  set: ({ set, get }, categoryId) => {
    if (categoryId === null || typeof categoryId === "string") {
      set(categoryState, {
        ...get(categoryState),
        selectedCategoryId: categoryId,
      });

      if (categoryId) {
        set(activeFolderSelector, Folder.CATEGORY);
      }
    }
  },
});

export const selectedCategorySelector = selector({
  key: "selected-category-selector",
  get: ({ get }) => {
    const state = get(categoryState);
    return state.categories.find((category) => category.id === state.selectedCategoryId);
  },
  set: ({ set, get }, category) => {
    if (category instanceof DefaultValue || !category) return;
    const state = get(categoryState);
    set(categoryState, {
      ...state,
      categories: state.categories.map((cat) => (cat.id === category.id ? category : cat)),
    });
  },
});

export const openCategoryListSelector = selector({
  key: "open-category-list-selector",
  get: ({ get }) => get(categoryState).categoryListOpen,
  set: ({ get, set }, status) =>
    !(status instanceof DefaultValue) &&
    set(categoryState, {
      ...get(categoryState),
      categoryListOpen: status,
    }),
});

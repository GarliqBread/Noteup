import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { NotesSortKey } from "utils/enums";

const { persistAtom } = recoilPersist();

export const settingsState = atom({
  key: "settings-state",
  default: {
    theme: "light",
    notesSortKey: NotesSortKey.LAST_UPDATED,
  },
  effects_UNSTABLE: [persistAtom],
});

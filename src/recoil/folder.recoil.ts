import { RecoilState, atom } from "recoil";

import { Folder } from "utils/enums";

// eslint-disable-next-line
// @ts-ignore
export const folderState: RecoilState<Folder> = atom({
  key: "folder-state",
  default: Folder.ALL,
});

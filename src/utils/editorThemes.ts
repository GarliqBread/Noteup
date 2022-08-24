import { duotoneDark, duotoneLight } from "@uiw/codemirror-theme-duotone";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";

export const editorThemes = {
  light: {
    github: githubLight,
    xcode: xcodeLight,
    duotone: duotoneLight,
  },
  dark: {
    github: githubDark,
    xcode: xcodeDark,
    duotone: duotoneDark,
  },
};

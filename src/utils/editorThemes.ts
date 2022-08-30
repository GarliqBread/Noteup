import { duotoneDark, duotoneLight } from "@uiw/codemirror-theme-duotone";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";
import {
  coldarkCold,
  coldarkDark,
  duotoneDark as dtd,
  duotoneLight as dtl,
  oneDark,
  oneLight,
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { EditorThemeKey, PreviewThemeKey } from "./enums";

export const editorThemes = {
  light: {
    [EditorThemeKey.GITHUB]: githubLight,
    [EditorThemeKey.XCODE]: xcodeLight,
    [EditorThemeKey.DUOTONE]: duotoneLight,
  },
  dark: {
    [EditorThemeKey.GITHUB]: githubDark,
    [EditorThemeKey.XCODE]: xcodeDark,
    [EditorThemeKey.DUOTONE]: duotoneDark,
  },
};

export const previewThemes = {
  light: {
    [PreviewThemeKey.DUOTONE]: dtl,
    [PreviewThemeKey.ONE]: oneLight,
    [PreviewThemeKey.VS]: vs,
    [PreviewThemeKey.COLDDARK]: coldarkCold,
  },
  dark: {
    [PreviewThemeKey.DUOTONE]: dtd,
    [PreviewThemeKey.ONE]: oneDark,
    [PreviewThemeKey.VS]: vscDarkPlus,
    [PreviewThemeKey.COLDDARK]: coldarkDark,
  },
};

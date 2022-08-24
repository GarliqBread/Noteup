import * as clipboard from "clipboard-polyfill/text";

import { Folder, LabelText } from "./enums";

export const getNoteBarConf = (
  activeFolder: Folder,
): {
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  allowResize?: boolean;
  resizerStyle?: React.CSSProperties;
} => {
  switch (activeFolder) {
    case Folder.SCRATCH:
      return {
        minSize: 0,
        maxSize: 0,
        defaultSize: 0,
        allowResize: false,
        resizerStyle: { display: "none" },
      };

    default:
      return {
        minSize: 200,
        maxSize: 600,
        defaultSize: 330,
      };
  }
};

export const getNoteTitle = (text: string): string => {
  const noteText = text.trim().match(/[^#]{1,45}/);
  // Get the first line of text after any newlines
  // In the future, this should break on a full word
  return noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.NEW_NOTE;
};

export const copyToClipboard = (text: string) => {
  clipboard.writeText(text);
};

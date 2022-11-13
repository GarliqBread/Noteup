import * as clipboard from "clipboard-polyfill/text";

import { Note } from "@/recoil/types";

import { LabelText } from "./enums";

export const isTauri = "__TAURI_IPC__" in window;

export const removeDuplicateNotes = (arr: Note[]): Note[] => {
  const uniqueIds: string[] = [];

  return arr.filter((element) => {
    if (!element.id && !element.tempId) return false;
    const isDuplicate = uniqueIds.find((item) => item === element.id || item === element.tempId);

    if (!isDuplicate) {
      uniqueIds.push(element.tempId || element.id || "");

      return true;
    }

    return false;
  });
};

export const getNoteTitle = (text: string): string => {
  const noteText = text.trim().match(/[^#]{1,45}/);
  return noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.NEW_NOTE;
};

export const getNoteBody = (text: string): string => {
  const noteText = text.trim().match(/[^#]{1,200}/);
  const trimmedText =
    noteText &&
    noteText?.[0]
      .trim()
      .split(/\r?\n/)[2]
      ?.replace(/[^a-z0-9]/gi, " ");
  return trimmedText ? `${trimmedText} ...` : "";
};

export const copyToClipboard = (text: string) => {
  clipboard.writeText(text);
};

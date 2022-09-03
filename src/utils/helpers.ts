import { save } from "@tauri-apps/api/dialog";
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import * as clipboard from "clipboard-polyfill/text";
import dayjs from "dayjs";
import { saveAs } from "file-saver";

import { Category, Note } from "recoil/types";

import { LabelText } from "./enums";

export const isTauri = "__TAURI_IPC__" in window;

export const removeDuplicateNotes = (arr: Note[]): Note[] => {
  const uniqueIds: string[] = [];

  return arr.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });
};

export const getNoteTitle = (text: string): string => {
  const noteText = text.trim().match(/[^#]{1,45}/);
  return noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.NEW_NOTE;
};

export const copyToClipboard = (text: string) => {
  clipboard.writeText(text);
};

export const downloadNote = (note: Note): void => {
  if (isTauri) {
    save({
      filters: [
        {
          name: "files",
          extensions: ["md"],
        },
      ],
    }).then((path) =>
      writeTextFile(path, note.text, {
        dir: BaseDirectory.App,
      }),
    );
  } else {
    const blob = new Blob([note.text], {
      type: "text/plain;charset=utf-8",
    });

    saveAs(blob, "note.md");
  }
};

export const backupNotes = (notes: Note[], categories: Category[]) => {
  if (isTauri) {
    save({
      filters: [
        {
          name: "files",
          extensions: ["json"],
        },
      ],
    }).then((path) =>
      writeTextFile(path, JSON.stringify({ notes, categories }), {
        dir: BaseDirectory.App,
      }),
    );
  } else {
    const json = JSON.stringify({ notes, categories });
    const blob = new Blob([json], { type: "application/json" });

    saveAs(blob, `noteup-backup-${dayjs().format("YYYY-MM-DD")}.json`);
  }
};

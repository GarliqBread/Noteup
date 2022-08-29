import { save } from "@tauri-apps/api/dialog";
import { BaseDirectory, writeBinaryFile, writeTextFile } from "@tauri-apps/api/fs";
import * as clipboard from "clipboard-polyfill/text";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import JSZip from "jszip";

import { Category, Note } from "recoil/types";

import { Folder, LabelText } from "./enums";

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

const noteWithFrontmatter = (note: Note, category?: Category): string =>
  `---
title: ${getNoteTitle(note.text)}
created: ${note.created}
lastUpdated: ${note.lastUpdated}
category: ${category?.name || ""}
---

${note.text}`;

// Downloads a single note as a markdown file or a group of notes as a zip file.
export const downloadNotes = (notes: Note[], categories: Category[]): void => {
  if (notes.length === 1) {
    const category = categories.find((category: Category) => category.id === notes[0].categoryId);

    if (isTauri) {
      save({
        filters: [
          {
            name: "files",
            extensions: ["md"],
          },
        ],
      }).then((path) =>
        writeTextFile(path, noteWithFrontmatter(notes[0], category), {
          dir: BaseDirectory.App,
        }),
      );
    } else {
      const blob = new Blob([noteWithFrontmatter(notes[0], category)], {
        type: "text/plain;charset=utf-8",
      });

      saveAs(blob, "note.md");
    }
  } else {
    const zip = new JSZip();
    notes.forEach((note) =>
      zip.file(
        `${getNoteTitle(note.text)} (${note.id.substring(0, 6)}).md`,
        noteWithFrontmatter(
          note,
          categories.find((category: Category) => category.id === note.categoryId),
        ),
      ),
    );

    if (isTauri) {
      zip.generateAsync({ type: "uint8array" }).then((content) => {
        save({
          filters: [
            {
              name: "files",
              extensions: ["zip"],
            },
          ],
        }).then((path) =>
          writeBinaryFile(path, content, {
            dir: BaseDirectory.App,
          }),
        );
      });
    } else {
      zip.generateAsync({ type: "blob" }).then(
        (content) => saveAs(content, "notes.zip"),
        (err) => {
          console.log(err);
          // TODO: error generating zip file.
          // Generate a popup?
        },
      );
    }
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

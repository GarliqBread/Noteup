import { save } from "@tauri-apps/api/dialog";
import { BaseDirectory, writeBinaryFile, writeTextFile } from "@tauri-apps/api/fs";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { renderToStaticMarkup } from "react-dom/server";
import { RecoilRoot } from "recoil";

import { Category, Note } from "@/recoil/types";

import { NotePreview } from "@/pages/Notebook/NotePreviewer";

import { ThemeWrapper } from "@/components/ThemeWrapper";

import { isTauri } from "./helpers";

export const downloadPdf = async (note: Note) => {
  const element = document.getElementById("pdf-preview");
  if (!element) return;
  const doc = new jsPDF("p", "pt", [793.706, 841.89]);
  element.innerHTML = renderToStaticMarkup(
    <RecoilRoot>
      <ThemeWrapper>
        <NotePreview previewNote={note} />
      </ThemeWrapper>
    </RecoilRoot>,
  );

  doc.setFontSize(9);
  doc.html(element, {
    autoPaging: "text",
    callback: function (doc) {
      if (isTauri) {
        save({
          filters: [
            {
              name: "files",
              extensions: ["pdf"],
            },
          ],
        }).then((path) =>
          writeBinaryFile(path, doc.output("arraybuffer"), {
            dir: BaseDirectory.App,
          }),
        );
      } else {
        doc.save("note.pdf");
      }
      // element.innerHTML = "";
    },
  });
};

export const downloadMarkdown = (note: Note): void => {
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

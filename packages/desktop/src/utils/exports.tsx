import { save } from "@tauri-apps/api/dialog";
import { BaseDirectory, writeBinaryFile, writeTextFile } from "@tauri-apps/api/fs";
import { jsPDF } from "jspdf";
import { renderToStaticMarkup } from "react-dom/server";
import { RecoilRoot } from "recoil";

import { Category, Note } from "@/recoil/types";

import { NotePreview } from "@/views/NotePreviewer";

import { ThemeWrapper } from "@/components/ThemeWrapper";

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
    callback: (doc) =>
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
      ),
  });
};

export const downloadMarkdown = (note: Note): void =>
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

export const backupNotes = (notes: Note[], categories: Category[]) =>
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

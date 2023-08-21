import { Category, Note } from "@noteup/shared/recoil/types";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { renderToStaticMarkup } from "react-dom/server";
import { RecoilRoot } from "recoil";

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
    callback: function (doc) {
      doc.save("note.pdf");
    },
  });
};

export const downloadMarkdown = (note: Note): void => {
  const blob = new Blob([note.text], {
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, "note.md");
};

export const backupNotes = (notes: Note[], categories: Category[]) => {
  const json = JSON.stringify({ notes, categories });
  const blob = new Blob([json], { type: "application/json" });

  saveAs(blob, `noteup-backup-${dayjs().format("YYYY-MM-DD")}.json`);
};

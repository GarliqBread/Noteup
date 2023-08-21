import { EditorBar } from "@noteup/shared/components/NoteEditor/EditorBar";
import { EmptyEditorMessage } from "@noteup/shared/components/NotePreviewer/EmptyEditorMessage";
import { editingSelector, splitSelector } from "@noteup/shared/recoil/editor.recoil";
import { selectedNoteSelector } from "@noteup/shared/recoil/notes.recoil";
import { sectionsSelector } from "@noteup/shared/recoil/sections.recoil";
import { FlexColumn } from "@noteup/shared/styles/layout";
import { Section } from "@noteup/shared/utils/enums";
import { useWindowDimensions } from "@noteup/shared/utils/hooks/useWindowDimensions";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { useMemo, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { downloadMarkdown, downloadPdf } from "@/utils/exports";

import { NoteEditor } from "@/views/NoteEditor";
import { NotePreview } from "@/views/NotePreviewer";

import { SplitScreenEditor } from "./SplitScreenEditor";

export const NoteContainer = () => {
  const { isSmallDevice } = useWindowDimensions();
  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const section = useRecoilValue(sectionsSelector);
  const editing = useRecoilValue(editingSelector);
  const split = useRecoilValue(splitSelector);
  const [note, setNote] = useRecoilState(selectedNoteSelector);

  const editorView = useMemo(() => section === Section.NOTE, [section]);

  return (
    <FlexColumn width="100%" height="100%">
      <EditorBar note={note} downloadMarkdown={downloadMarkdown} downloadPdf={downloadPdf} />
      <div id="pdf-preview" />
      {((isSmallDevice && editorView) || !isSmallDevice) && (
        <>
          {note ? (
            <>
              {editing && split && !isSmallDevice ? (
                <SplitScreenEditor editorRef={editorRef} note={note} setNote={setNote} />
              ) : (
                <>
                  {!editing && <NotePreview previewNote={note} />}
                  {editing && <NoteEditor editorRef={editorRef} note={note} setNote={setNote} />}
                </>
              )}
            </>
          ) : (
            <EmptyEditorMessage />
          )}
        </>
      )}
    </FlexColumn>
  );
};

import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { editingSelector, splitSelector } from "@/recoil/editor.recoil";
import { selectedNoteSelector } from "@/recoil/notes.recoil";
import { sectionsSelector } from "@/recoil/sections.recoil";

import { Section } from "@/utils/enums";
import { useWindowDimensions } from "@/utils/hooks/useWindowDimensions";

import { NoteEditor } from "@/views/NoteEditor";
import { NotePreview } from "@/views/NotePreviewer";

import { EditorBar } from "@/components/EditorBar";
import { EmptyEditorMessage } from "@/components/NotePreviewer/EmptyEditorMessage";

import { FlexColumn } from "@/styles/layout";

import { SplitScreenEditor } from "./SplitScreenEditor";

export const NoteContainer = () => {
  const { isSmallDevice } = useWindowDimensions();
  const section = useRecoilValue(sectionsSelector);
  const editing = useRecoilValue(editingSelector);
  const split = useRecoilValue(splitSelector);
  const [note, setNote] = useRecoilState(selectedNoteSelector);

  const editorView = useMemo(() => section === Section.NOTE, [section]);

  return (
    <FlexColumn width="100%" height="100%">
      <EditorBar note={note} />
      {((isSmallDevice && editorView) || !isSmallDevice) && (
        <>
          {note ? (
            <>
              {editing && split && !isSmallDevice ? (
                <SplitScreenEditor note={note} setNote={setNote} />
              ) : (
                <>
                  {!editing && <NotePreview previewNote={note} />}
                  {editing && <NoteEditor note={note} setNote={setNote} />}
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

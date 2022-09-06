import { useMemo } from "react";
import SplitPane from "react-split-pane";
import { useRecoilState, useRecoilValue } from "recoil";

import { editingSelector, splitSelector } from "recoil/editor.recoil";
import { selectedNoteSelector } from "recoil/notes.recoil";
import { sectionsSelector } from "recoil/sections.recoil";

import { Section } from "utils/enums";
import { useWindowDimensions } from "utils/hooks/useWindowDimensions";

import { NoteEditor } from "views/NoteEditor";
import { NotePreview } from "views/NotePreviewer";

import { EditorBar } from "components/EditorBar";

import { FlexColumn } from "styles/layout";

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
        <FlexColumn justifyContent="space-between" alignItems="initial" height="100%">
          {note && (
            <>
              {editing && split && !isSmallDevice ? (
                <SplitPane split="vertical" size="50%">
                  <NoteEditor note={note} setNote={setNote} />
                  <NotePreview border previewNote={note} />
                </SplitPane>
              ) : (
                <>
                  {!editing && <NotePreview previewNote={note} />}
                  {editing && <NoteEditor note={note} setNote={setNote} />}
                </>
              )}
            </>
          )}
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

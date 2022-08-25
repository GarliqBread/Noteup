import { Portal, Root, Trigger } from "@radix-ui/react-context-menu";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { notesState, selectedNoteSelector } from "recoil/notes.recoil";

import { ArrowBack, Close, Pin, Trash } from "components/Icons";

import { ContextContent, ContextItem } from "./style";

type Props = { noteId: string; children: React.ReactNode };

export const ContextMenu = ({ noteId, children }: Props) => {
  const setNotesState = useSetRecoilState(selectedNoteSelector);
  const selectedNote = useRecoilValue(notesState).notes.find((note) => note.id === noteId);

  const toggleNoteTrash = () =>
    !!selectedNote &&
    setNotesState({
      ...selectedNote,
      trash: !selectedNote.trash,
    });

  const toggleNotePin = () =>
    !!selectedNote &&
    setNotesState({
      ...selectedNote,
      pinned: !selectedNote.pinned,
    });

  const deleteNote = () =>
    !!selectedNote &&
    setNotesState({
      ...selectedNote,
      deleted: true,
    });

  return (
    <Root>
      <Trigger>{children}</Trigger>
      <Portal>
        <ContextContent>
          {selectedNote?.trash ? (
            <>
              <ContextItem onClick={toggleNoteTrash}>
                <ArrowBack size={15} /> Restore note
              </ContextItem>
              <ContextItem danger="true" onClick={deleteNote}>
                <Close size={15} /> Delete permanently
              </ContextItem>
            </>
          ) : (
            <>
              <ContextItem onClick={toggleNotePin}>
                <Pin size={15} /> {selectedNote?.pinned ? "Remove Pin" : "Add Pin"}
              </ContextItem>
              <ContextItem danger="true" onClick={toggleNoteTrash}>
                <Trash size={15} /> Move to Trash
              </ContextItem>
            </>
          )}
        </ContextContent>
      </Portal>
    </Root>
  );
};

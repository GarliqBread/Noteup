import { Portal, Root, Trigger } from "@radix-ui/react-context-menu";
import { useRecoilState } from "recoil";
import { notesState } from "recoil/notes.recoil";

import { ArrowBack, Close, Pin, Trash } from "components/Icons";

import { ContextContent, ContextItem } from "./style";

type Props = { noteId: string; pinned?: boolean; trash?: boolean; children: React.ReactNode };

export const ContextMenu = ({ pinned, trash, noteId, children }: Props) => {
  const [state, setNotesState] = useRecoilState(notesState);
  const toggleNoteTrash = () =>
    setNotesState({
      ...state,
      notes: state.notes.map((note) =>
        note.id === noteId ? { ...note, trash: !note.trash } : note,
      ),
    });
  const toggleNotePin = () =>
    setNotesState({
      ...state,
      notes: state.notes.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note,
      ),
    });
  const deleteNote = () =>
    setNotesState({
      ...state,
      notes: state.notes.filter((note) => note.id !== noteId),
    });

  return (
    <Root>
      <Trigger>{children}</Trigger>
      <Portal>
        <ContextContent>
          {trash ? (
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
                <Pin size={15} /> {pinned ? "Remove Pin" : "Add Pin"}
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

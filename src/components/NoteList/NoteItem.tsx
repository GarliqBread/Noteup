import { useRecoilState } from "recoil";
import { notesState } from "recoil/notes.recoil";
import { Note } from "recoil/types";
import { Ellipsis, Flex } from "styles/layout";
import { Label } from "styles/typography";

import { Folder, Notebook, Pin } from "components/Icons";

import { NoteItemContainer } from "./style";

type Props = {
  note: Note;
  selected?: boolean;
  children: React.ReactNode;
};

export const NoteItem = ({ selected, note, children }: Props) => {
  const [{ categories }, setNotesState] = useRecoilState(notesState);
  return (
    <NoteItemContainer
      onClick={() =>
        setNotesState((prev) => ({
          ...prev,
          selectedNoteId: note.id,
        }))
      }
      selected={selected}
    >
      <Flex>
        <Flex width="20px" height="20px">
          {note.pinned && <Pin className="pin" size={15} />}
        </Flex>
        <Ellipsis>{children}</Ellipsis>
      </Flex>
      <Flex margin="0 0 0 20px" gap={5}>
        {note.categoryId ? <Folder size={14} /> : <Notebook size={14} />}
        <Label>
          {categories.find((category) => category.id === note.categoryId)?.name || "Notes"}
        </Label>
      </Flex>
    </NoteItemContainer>
  );
};

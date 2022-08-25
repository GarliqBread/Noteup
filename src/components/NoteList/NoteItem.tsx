import { useRecoilState, useRecoilValue } from "recoil";

import { categoriesSelector } from "recoil/categories.recoil";
import { selectNoteIdSelector } from "recoil/notes.recoil";
import { Note } from "recoil/types";

import { Folder, Notebook, Pin } from "components/Icons";

import { NoteItemContainer } from "./style";

import { Ellipsis, Flex } from "styles/layout";
import { Label } from "styles/typography";

type Props = {
  note: Note;
  selected?: boolean;
  children: React.ReactNode;
};

export const NoteItem = ({ note, children }: Props) => {
  const categories = useRecoilValue(categoriesSelector);
  const [selectedNoteId, setSelectedNote] = useRecoilState(selectNoteIdSelector);

  return (
    <NoteItemContainer
      onClick={() => setSelectedNote(note.id)}
      selected={selectedNoteId === note.id}
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

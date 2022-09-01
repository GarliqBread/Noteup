import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { categoriesSelector } from "recoil/categories.recoil";
import { selectNoteIdSelector } from "recoil/notes.recoil";
import { sectionsSelector } from "recoil/sections.recoil";
import { Note } from "recoil/types";

import { Section } from "utils/enums";

import { FilledPin, Folder, Notes } from "components/Icons";

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
  const setSection = useSetRecoilState(sectionsSelector);

  const handleNoteClick = () => {
    setSelectedNote(note.id);
    setSection(Section.NOTE);
  };

  return (
    <NoteItemContainer onClick={handleNoteClick} selected={selectedNoteId === note.id}>
      <Flex>
        <Flex width="20px" height="20px">
          {note.pinned && <FilledPin className="pin" size={15} />}
        </Flex>
        <Ellipsis>{children}</Ellipsis>
      </Flex>
      <Flex margin="0 0 0 20px" gap={5}>
        {note.categoryId ? <Folder size={14} /> : <Notes size={14} />}
        <Label>
          {categories.find((category) => category.id === note.categoryId)?.name || "Notes"}
        </Label>
      </Flex>
    </NoteItemContainer>
  );
};

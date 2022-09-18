import { Note } from "@/recoil/types";

import { FilledPin, Folder, Notes } from "@/components/Icons";

import { Ellipsis, Flex } from "@/styles/layout";
import { Label } from "@/styles/typography";

import { NoteItemContainer } from "./style";

type Props = {
  note: Note;
  selected?: boolean;
  category: string;
  onClick: (id: string) => void;
  children: React.ReactNode;
};

export const NoteItem = ({ note, selected, category, onClick, children }: Props) => {
  return (
    <NoteItemContainer onClick={() => onClick(note.id)} selected={selected}>
      <Flex>
        <Flex width="20px" height="20px">
          {note.pinned && <FilledPin className="pin" size={15} />}
        </Flex>
        <Ellipsis>{children}</Ellipsis>
      </Flex>
      <Flex margin="0 0 0 20px" gap={5}>
        {note.categoryId ? <Folder size={14} /> : <Notes size={14} />}
        <Label>{category}</Label>
      </Flex>
    </NoteItemContainer>
  );
};

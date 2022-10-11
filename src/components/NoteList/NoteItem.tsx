import { Note } from "@/recoil/types";

import { useDayjs } from "@/utils/hooks/useDayjs";

import { FilledPin, Folder, Notes } from "@/components/Icons";

import { Ellipsis, EllipsisParagraph, Flex } from "@/styles/layout";
import { Label } from "@/styles/typography";

import { NoteItemContainer } from "./style";

type Props = {
  title: string | JSX.Element;
  note: Note;
  selected?: boolean;
  category: string;
  onClick: (id: string) => void;
  children: React.ReactNode;
};

export const NoteItem = ({ title, note, selected, category, onClick, children }: Props) => {
  const { formatTo } = useDayjs();

  return (
    <NoteItemContainer onClick={() => onClick(note.id)} selected={selected}>
      <Flex>
        {note.pinned && <FilledPin className="pin" size={15} />}
        <Ellipsis>{title}</Ellipsis>
      </Flex>
      <Flex margin="4px 0 6px 0">
        <EllipsisParagraph>{children}</EllipsisParagraph>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex gap={5} width="auto">
          {note.categoryId ? <Folder size={14} /> : <Notes size={14} />}
          <Label>{category}</Label>
        </Flex>
        <Label>{formatTo(note.lastUpdated)}</Label>
      </Flex>
    </NoteItemContainer>
  );
};

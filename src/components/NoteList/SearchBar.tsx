import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { selectedCategoryIdSelector } from "@/recoil/categories.recoil";
import { editingSelector } from "@/recoil/editor.recoil";
import { activeFolderSelector } from "@/recoil/folder.recoil";
import { keywordSelector, notesSelector, notesState } from "@/recoil/notes.recoil";
import { sectionsSelector } from "@/recoil/sections.recoil";

import { Folder, Section } from "@/utils/enums";

import { Button } from "@/components/Button";
import { Plus, Trash } from "@/components/Icons";
import { Input } from "@/components/Input";

import { SearchContainer } from "./style";

type Props = {
  isListEmpty: boolean;
};

export const SearchBar = ({ isListEmpty }: Props) => {
  const [notes, setNotes] = useRecoilState(notesSelector);
  const [noteState, setNoteState] = useRecoilState(notesState);
  const [keyword, setKeyword] = useRecoilState(keywordSelector);
  const setSection = useSetRecoilState(sectionsSelector);
  const activeFolder = useRecoilValue(activeFolderSelector);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdSelector);
  const setEditing = useSetRecoilState(editingSelector);
  const isTrash = activeFolder === Folder.TRASH;

  const addNewNote = () => {
    setEditing(false);
    setNotes([
      {
        id: uuid(),
        text: "",
        created: dayjs().format(),
        lastUpdated: dayjs().format(),
        categoryId: selectedCategoryId || undefined,
        pinned: activeFolder === Folder.PINNED,
      },
    ]);
    setSection(Section.NOTE);
    setTimeout(() => setEditing(true), 100);
  };

  useEffect(() => () => setKeyword(""), [setKeyword]);

  return (
    <SearchContainer>
      <Input placeholder="Search" clear value={keyword} onChange={setKeyword} />
      {isTrash ? (
        <Button
          disabled={isListEmpty}
          title="Empty trash"
          variant="danger"
          onClick={() =>
            setNoteState({
              ...noteState,
              notes: notes.filter((note) => !note.trash),
            })
          }
        >
          <Trash size={15} />
        </Button>
      ) : (
        <Button title="Add new note" variant="primary" onClick={addNewNote}>
          <Plus size={15} />
        </Button>
      )}
    </SearchContainer>
  );
};

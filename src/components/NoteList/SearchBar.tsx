import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";

import { selectedCategorySelector } from "recoil/categories.recoil";
import { activeFolderSelector } from "recoil/folder.recoil";
import { notesState } from "recoil/notes.recoil";

import { Folder } from "utils/enums";

import { Button } from "components/Button";
import { Plus } from "components/Icons";
import { Input } from "components/Input";

import { SearchContainer } from "./style";

type Props = {
  isListEmpty: boolean;
};

export const SearchBar = ({ isListEmpty }: Props) => {
  const [{ keyword }, setNotesState] = useRecoilState(notesState);
  const activeFolder = useRecoilValue(activeFolderSelector);
  const selectedCategoryId = useRecoilValue(selectedCategorySelector);
  const isTrash = activeFolder === Folder.TRASH;

  const handleKeywordChange = (value: string) =>
    setNotesState((state) => ({ ...state, keyword: value }));

  const addNewNote = () =>
    setNotesState((state) => ({
      ...state,
      notes: [
        ...state.notes,
        {
          id: uuid(),
          text: "",
          created: dayjs().format(),
          lastUpdated: dayjs().format(),
          category: selectedCategoryId,
          pinned: activeFolder === Folder.PINNED,
        },
      ],
    }));

  useEffect(() => () => setNotesState((state) => ({ ...state, keyword: "" })), [setNotesState]);

  return (
    <SearchContainer>
      <Input placeholder="Search" clear value={keyword} onChange={handleKeywordChange} />
      {isTrash ? (
        <Button
          disabled={isListEmpty}
          title="Empty trash"
          variant="danger"
          onClick={() =>
            setNotesState((state) => ({
              ...state,
              notes: state.notes.filter((note) => !note.trash),
            }))
          }
        >
          Empty
        </Button>
      ) : (
        <Button title="Add new note" variant="primary" onClick={addNewNote}>
          <Plus size={15} />
        </Button>
      )}
    </SearchContainer>
  );
};

import { useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { notesState } from "recoil/notes.recoil";
import { settingsState } from "recoil/settings.recoil";
import { Note } from "recoil/types";

import { Folder } from "utils/enums";
import { getNoteTitle } from "utils/helpers";
import { getNotesSorter } from "utils/sorting";

import { ContextMenu } from "./ContextMenu";
import { NoteItem } from "./NoteItem";
import { SearchBar } from "./SearchBar";
import { List } from "./style";

export const NoteList = () => {
  const { notesSortKey } = useRecoilValue(settingsState);
  const [{ notes, selectedNoteId, selectedCategoryId, activeFolder }, setNotesState] =
    useRecoilState(notesState);
  const [keyword, setKeyword] = useState("");

  const regex = useMemo(
    () => new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    [keyword],
  );

  const filter: Record<Folder, (note: Note) => boolean> = {
    [Folder.CATEGORY]: (note) => !note.trash && note.categoryId === selectedCategoryId,
    [Folder.SCRATCH]: (note) => !!note.scratchpad,
    [Folder.PINNED]: (note) => !note.trash && !!note.pinned,
    [Folder.TRASH]: (note) => !!note.trash,
    [Folder.ALL]: (note) => !note.trash && !note.scratchpad,
  };

  const filteredNotes = notes
    .filter(filter[activeFolder])
    .filter((note) => regex.test(getNoteTitle(note.text)))
    .sort(getNotesSorter(notesSortKey));

  return (
    <List>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        isTrash={activeFolder === Folder.TRASH && filteredNotes.length > 0}
        deleteTrash={() =>
          setNotesState((state) => ({ ...state, notes: state.notes.filter((note) => !note.trash) }))
        }
      />
      {filteredNotes.map((note) => {
        let noteTitle: string | JSX.Element = getNoteTitle(note.text);

        if (keyword !== "") {
          const highlightStart = noteTitle.search(regex);
          if (highlightStart !== -1) {
            const highlightEnd = highlightStart + keyword.length;

            noteTitle = (
              <span>
                {noteTitle.slice(0, highlightStart)}
                <strong className="highlighted">
                  {noteTitle.slice(highlightStart, highlightEnd)}
                </strong>
                {noteTitle.slice(highlightEnd)}
              </span>
            );
          }
        }

        return (
          <ContextMenu key={note.id} noteId={note.id} trash={note.trash} pinned={note.pinned}>
            <NoteItem note={note} selected={selectedNoteId === note.id}>
              {noteTitle}
            </NoteItem>
          </ContextMenu>
        );
      })}
    </List>
  );
};

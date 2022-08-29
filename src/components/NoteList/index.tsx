import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { filteredNotesSelector, notesState } from "recoil/notes.recoil";

import { getNoteTitle } from "utils/helpers";

import { NoteContext } from "./NoteContext";
import { NoteItem } from "./NoteItem";
import { SearchBar } from "./SearchBar";
import { List } from "./style";

export const NoteList = () => {
  const filteredNotes = useRecoilValue(filteredNotesSelector);
  const [{ selectedNoteId, keyword }] = useRecoilState(notesState);

  const regex = useMemo(
    () => new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    [keyword],
  );

  return (
    <List>
      <SearchBar isListEmpty={!filteredNotes.length} />
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
          <NoteContext key={note.id} noteId={note.id}>
            <NoteItem note={note} selected={selectedNoteId === note.id}>
              {noteTitle}
            </NoteItem>
          </NoteContext>
        );
      })}
    </List>
  );
};

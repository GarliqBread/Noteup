import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { categoriesSelector } from "@/recoil/categories.recoil";
import { activeFolderSelector } from "@/recoil/folder.recoil";
import {
  filteredNotesSelector,
  keywordSelector,
  selectNoteIdSelector,
} from "@/recoil/notes.recoil";
import { sectionsSelector } from "@/recoil/sections.recoil";

import { emptyListMessage } from "@/utils/constants";
import { Section } from "@/utils/enums";
import { getNoteBody, getNoteTitle } from "@/utils/helpers";
import { useWindowDimensions } from "@/utils/hooks/useWindowDimensions";

import { NoteContext } from "./NoteContext";
import { NoteItem } from "./NoteItem";
import { SearchBar } from "./SearchBar";
import { EmptyListMessage, List, NotesList } from "./style";

export const NoteList = () => {
  const { isSmallDevice } = useWindowDimensions();
  const categories = useRecoilValue(categoriesSelector);
  const activeFolder = useRecoilValue(activeFolderSelector);
  const [section, setSection] = useRecoilState(sectionsSelector);
  const filteredNotes = useRecoilValue(filteredNotesSelector);
  const [selectedNoteId, setSelectedNote] = useRecoilState(selectNoteIdSelector);
  const keyword = useRecoilValue(keywordSelector);

  const inView = useMemo(() => section === Section.LIST, [section]);

  const regex = useMemo(
    () => new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    [keyword],
  );

  const handleNoteClick = (id: string) => {
    setSelectedNote(id);
    setSection(Section.NOTE);
  };

  return (
    <>
      {(inView || !isSmallDevice) && (
        <NotesList>
          <SearchBar isListEmpty={!filteredNotes.length} />
          <List>
            {filteredNotes.map((note) => {
              let noteTitle: string | JSX.Element = getNoteTitle(note.text);

              if (keyword !== "") {
                const highlightStart = noteTitle.search(regex);
                if (highlightStart !== -1) {
                  const highlightEnd = highlightStart + keyword.length;

                  noteTitle = (
                    <>
                      {noteTitle.slice(0, highlightStart)}
                      <strong className="highlighted">
                        {noteTitle.slice(highlightStart, highlightEnd)}
                      </strong>
                      {noteTitle.slice(highlightEnd)}
                    </>
                  );
                }
              }

              return (
                <NoteContext key={note.id} noteId={note.id} selected={selectedNoteId === note.id}>
                  <NoteItem
                    title={noteTitle}
                    note={note}
                    selected={selectedNoteId === note.id}
                    onClick={handleNoteClick}
                    category={
                      categories.find((category) => category.id === note.categoryId)?.name ||
                      "Notes"
                    }
                  >
                    {getNoteBody(note.text)}
                  </NoteItem>
                </NoteContext>
              );
            })}
            {!filteredNotes.length && (
              <EmptyListMessage>{emptyListMessage[activeFolder]}</EmptyListMessage>
            )}
          </List>
        </NotesList>
      )}
    </>
  );
};

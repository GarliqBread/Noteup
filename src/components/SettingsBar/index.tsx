import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Flex } from "styles/layout";

import { categoriesSelector } from "recoil/categories.recoil";
import { selectNoteIdSelector, selectedNoteSelector } from "recoil/notes.recoil";
import { themeSelector } from "recoil/settings.recoil";
import { Note } from "recoil/types";

import { copyToClipboard, downloadNotes } from "utils/helpers";

import {
  ArrowBack,
  Clipboard,
  DownloadNote,
  Edit,
  Eye,
  Gear,
  Moon,
  Pin,
  Sun,
  Trash,
} from "components/Icons";

import { BottomNav, BottomNavButton } from "./styled";

type Props = {
  note?: Note;
  editing: boolean;
  setEditing: () => void;
  toggleModal: () => void;
};

export const SettingsBar = ({ note, editing, setEditing, toggleModal }: Props) => {
  const [uuidCopiedText, setUuidCopiedText] = useState<string>("");
  const setNoteState = useSetRecoilState(selectedNoteSelector);
  const [theme, toggleTheme] = useRecoilState(themeSelector);
  const setSelectedNote = useSetRecoilState(selectNoteIdSelector);
  const categories = useRecoilValue(categoriesSelector);
  const successfulCopyMessage = "Note ID copied!";

  const toggleNotePin = () =>
    !!note &&
    setNoteState({
      ...note,
      pinned: !note.pinned,
    });

  const deleteNote = () => {
    !!note &&
      setNoteState({
        ...note,
        trash: !note.trash,
      });
    editing && setEditing();
    setSelectedNote(null);
  };

  const copyNoteId = () => {
    !!note && copyToClipboard(`{{${note.id}}}`);
    setUuidCopiedText(successfulCopyMessage);
  };

  const downloadNote = () => {
    !!note && downloadNotes([note], categories);
  };

  useEffect(() => {
    if (uuidCopiedText === successfulCopyMessage) {
      const timer = setTimeout(() => {
        setUuidCopiedText("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [uuidCopiedText]);

  return (
    <BottomNav>
      <Flex height="100%">
        {!!note && (
          <>
            <BottomNavButton title="Toggle editing" onClick={setEditing}>
              {editing ? <Eye size={18} /> : <Edit size={18} />}
            </BottomNavButton>
            {!note.scratchpad && (
              <>
                <BottomNavButton primary={note?.pinned} title="Pin note" onClick={toggleNotePin}>
                  <Pin size={18} />
                </BottomNavButton>

                <BottomNavButton trash title="Delete note" onClick={deleteNote}>
                  {note.trash ? <ArrowBack size={18} /> : <Trash size={18} />}
                </BottomNavButton>
              </>
            )}
            <BottomNavButton title="Download note" onClick={downloadNote}>
              <DownloadNote size={18} />
            </BottomNavButton>
            {!note.scratchpad && (
              <BottomNavButton title="Copy note ID" onClick={copyNoteId}>
                <Clipboard size={18} />
                <span>{uuidCopiedText}</span>
              </BottomNavButton>
            )}
          </>
        )}
      </Flex>
      <Flex height="100%" justifyContent="flex-end">
        <BottomNavButton
          title="Change theme"
          onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </BottomNavButton>
        <BottomNavButton title="Open settings" onClick={toggleModal}>
          <Gear size={18} />
        </BottomNavButton>
      </Flex>
    </BottomNav>
  );
};

import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectNoteIdSelector, selectedNoteSelector } from "recoil/notes.recoil";
import { themeSelector } from "recoil/settings.recoil";
import { Note } from "recoil/types";
import { Flex } from "styles/layout";

import { copyToClipboard } from "utils/helpers";

import { ArrowBack, Clipboard, Edit, Eye, Gear, Moon, Pin, Sun, Trash } from "components/Icons";

import { BottomNav, BottomNavButton } from "./styled";

type Props = {
  note: Note;
  editing: boolean;
  setEditing: () => void;
  toggleModal: () => void;
};

export const SettingsBar = ({ note, editing, setEditing, toggleModal }: Props) => {
  const [uuidCopiedText, setUuidCopiedText] = useState<string>("");
  const setNoteState = useSetRecoilState(selectedNoteSelector);
  const [theme, toggleTheme] = useRecoilState(themeSelector);
  const setSelectedNote = useSetRecoilState(selectNoteIdSelector);
  const successfulCopyMessage = "Note ID copied!";

  const toggleNotePin = () =>
    setNoteState({
      ...note,
      pinned: !note.pinned,
    });

  const deleteNote = () => {
    setNoteState({
      ...note,
      trash: !note.trash,
    });
    editing && setEditing();
    setSelectedNote(null);
  };

  const copyNoteId = () => {
    copyToClipboard(`{{${note.id}}}`);
    setUuidCopiedText(successfulCopyMessage);
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
        <BottomNavButton name="Toggle editing" onClick={setEditing}>
          {editing ? <Eye size={18} /> : <Edit size={18} />}
        </BottomNavButton>
        <BottomNavButton primary={note?.pinned} name="Pin note" onClick={toggleNotePin}>
          <Pin size={18} />
        </BottomNavButton>
        <BottomNavButton trash name="Delete note" onClick={deleteNote}>
          {note.trash ? <ArrowBack size={18} /> : <Trash size={18} />}
        </BottomNavButton>
        <BottomNavButton name="Copy note ID" onClick={copyNoteId}>
          <Clipboard size={18} />
          <span>{uuidCopiedText}</span>
        </BottomNavButton>
      </Flex>
      <Flex height="100%" justifyContent="flex-end">
        <BottomNavButton onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </BottomNavButton>
        <BottomNavButton onClick={toggleModal}>
          <Gear size={18} />
        </BottomNavButton>
      </Flex>
    </BottomNav>
  );
};

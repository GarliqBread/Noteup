import dayjs from "dayjs";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { selectedCategoryIdSelector } from "@/recoil/categories.recoil";
import { editingSelector } from "@/recoil/editor.recoil";
import { activeFolderSelector } from "@/recoil/folder.recoil";
import { notesSelector, selectedNoteSelector } from "@/recoil/notes.recoil";
import { themeSelector } from "@/recoil/settings.recoil";

import { Folder, Shortcuts } from "@/utils/enums";
import { downloadMarkdown } from "@/utils/exports";
import { useKey } from "@/utils/hooks/useKey";

export const KeyboardShortcuts = () => {
  const setNotes = useSetRecoilState(notesSelector);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdSelector);
  const [activeFolder, setActiveFolder] = useRecoilState(activeFolderSelector);
  const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteSelector);
  const [editing, setEditing] = useRecoilState(editingSelector);
  const [theme, setTheme] = useRecoilState(themeSelector);

  const createNewNote = () => {
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
    setTimeout(() => setEditing(true), 100);
    if (activeFolder === Folder.TRASH) {
      setActiveFolder(Folder.ALL);
    }
  };

  const deleteCurrentNote = () => {
    if (selectedNote) {
      setSelectedNote({
        ...selectedNote,
        trash: true,
      });
    }
  };

  const handleDownloadNotes = () => !!selectedNote && downloadMarkdown(selectedNote);

  const toggleEditing = () => setEditing(!editing);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useKey(Shortcuts.NEW_NOTE, createNewNote);
  useKey(Shortcuts.DELETE_NOTE, deleteCurrentNote);
  useKey(Shortcuts.DOWNLOAD_NOTES, handleDownloadNotes);
  useKey(Shortcuts.PREVIEW, toggleEditing);
  useKey(Shortcuts.TOGGLE_THEME, toggleTheme);

  return null;
};

import { selectedCategoryIdSelector } from "@noteup/shared/recoil/categories.recoil";
import { editingSelector } from "@noteup/shared/recoil/editor.recoil";
import { activeFolderSelector } from "@noteup/shared/recoil/folder.recoil";
import { notesSelector, selectedNoteSelector } from "@noteup/shared/recoil/notes.recoil";
import { fullScreenSelector } from "@noteup/shared/recoil/screen.recoil";
import { themeSelector } from "@noteup/shared/recoil/settings.recoil";
import { Folder, Shortcuts } from "@noteup/shared/utils/enums";
import { useKey } from "@noteup/shared/utils/hooks/useKey";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { downloadMarkdown } from "@/utils/exports";

export const KeyboardShortcuts = () => {
  const setNotes = useSetRecoilState(notesSelector);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdSelector);
  const [activeFolder, setActiveFolder] = useRecoilState(activeFolderSelector);
  const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteSelector);
  const [editing, setEditing] = useRecoilState(editingSelector);
  const [theme, setTheme] = useRecoilState(themeSelector);
  const [fullScreen, setFullScreen] = useRecoilState(fullScreenSelector);

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

  const toggleFullScreen = () => setFullScreen(!fullScreen);

  useKey(Shortcuts.NEW_NOTE, createNewNote);
  useKey(Shortcuts.DELETE_NOTE, deleteCurrentNote);
  useKey(Shortcuts.DOWNLOAD_NOTES, handleDownloadNotes);
  useKey(Shortcuts.PREVIEW, toggleEditing);
  useKey(Shortcuts.TOGGLE_THEME, toggleTheme);
  useKey(Shortcuts.TOGGLE_FULL_SCREEN, toggleFullScreen);

  return null;
};

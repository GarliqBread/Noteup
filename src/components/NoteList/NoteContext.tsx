import { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { categoriesSelector } from "recoil/categories.recoil";
import { notesState, selectNoteIdSelector, selectedNoteSelector } from "recoil/notes.recoil";

import { copyToClipboard, downloadNotes } from "utils/helpers";

import { ContextMenu } from "components/ContextMenu";
import { Dropdown } from "components/Dropdown";
import { ArrowBack, Clipboard, Close, Download, Pin, Trash } from "components/Icons";
import { Select } from "components/Select";

type Props = { noteId: string; children: React.ReactNode };

export const NoteContext = ({ noteId, children }: Props) => {
  const categories = useRecoilValue(categoriesSelector);
  const setNotesState = useSetRecoilState(selectedNoteSelector);
  const selectedNote = useRecoilValue(notesState).notes.find((note) => note.id === noteId);
  const setSelectedNoteId = useSetRecoilState(selectNoteIdSelector);

  const toggleNoteTrash = () => {
    !!selectedNote &&
      setNotesState({
        ...selectedNote,
        trash: !selectedNote.trash,
      });
    setSelectedNoteId(null);
  };

  const toggleNotePin = () =>
    !!selectedNote &&
    setNotesState({
      ...selectedNote,
      pinned: !selectedNote.pinned,
    });

  const deleteNote = () => {
    !!selectedNote &&
      setNotesState({
        ...selectedNote,
        deleted: true,
      });
    setSelectedNoteId(null);
  };

  const downloadNote = () => !!selectedNote && downloadNotes([selectedNote], categories);

  const copyNoteReference = () => !!selectedNote && copyToClipboard(`{{${selectedNote.id}}}`);

  const updateCategory = (categoryId: string) =>
    !!selectedNote &&
    setNotesState({
      ...selectedNote,
      categoryId,
    });

  const categoryOptions = useMemo(
    () => [
      {
        label: "Notes",
        value: "",
      },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ],
    [categories],
  );

  const staticMenuOptions = [
    {
      onClick: downloadNote,
      children: (
        <>
          <Download size={15} /> Download{" "}
        </>
      ),
    },

    {
      onClick: copyNoteReference,
      children: (
        <>
          <Clipboard size={15} /> Copy reference to note
        </>
      ),
    },
  ];

  const menu = selectedNote?.trash
    ? [
        {
          onClick: toggleNoteTrash,
          children: (
            <>
              <ArrowBack size={15} /> Restore note
            </>
          ),
        },
        {
          onClick: deleteNote,
          danger: true,
          children: (
            <>
              <Close size={15} /> Delete permanently
            </>
          ),
        },
      ]
    : [
        {
          children: (
            <Select
              key="select"
              className="select"
              emptyText="Move to category..."
              options={categoryOptions}
              value={selectedNote?.categoryId || ""}
              onChange={updateCategory}
            />
          ),
        },
        {
          onClick: toggleNotePin,
          children: (
            <>
              <Pin size={15} /> {selectedNote?.pinned ? "Remove Pin" : "Add Pin"}
            </>
          ),
        },
        {
          onClick: toggleNoteTrash,
          children: (
            <>
              <Trash size={15} /> Move to Trash
            </>
          ),
          danger: true,
        },
      ];

  return (
    <ContextMenu menu={[...menu, ...staticMenuOptions]}>
      {children}
      <Dropdown menu={[...menu, ...staticMenuOptions]} />
    </ContextMenu>
  );
};

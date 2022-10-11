import { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { categoriesSelector } from "@/recoil/categories.recoil";
import { notesState, selectNoteIdSelector, selectedNoteSelector } from "@/recoil/notes.recoil";

import { downloadMarkdown, downloadPdf } from "@/utils/exports";
import { copyToClipboard } from "@/utils/helpers";

import { ContextMenu } from "@/components/ContextMenu";
import { Dropdown } from "@/components/Dropdown";
import { ArrowBack, Clipboard, Download, Markdown, PDF, Pin, Trash } from "@/components/Icons";
import { Select } from "@/components/Select";

import { Flex } from "@/styles/layout";

type Props = { noteId: string; selected: boolean; children: React.ReactNode };

export const NoteContext = ({ noteId, selected, children }: Props) => {
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

  const downloadNoteAsMarkdown = () => !!selectedNote && downloadMarkdown(selectedNote);

  const downloadNoteAsPDF = () => !!selectedNote && downloadPdf(selectedNote);

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
      id: "download",
      children: (
        <Flex justifyContent="space-between">
          <Flex gap={5}>
            <Download size={15} /> Download
          </Flex>
          {"\u203a"}
        </Flex>
      ),
      subMenu: [
        {
          id: "pdf",
          onClick: downloadNoteAsPDF,
          children: (
            <Flex justifyContent="space-between">
              as PDF <PDF />
            </Flex>
          ),
        },
        {
          id: "md",
          onClick: downloadNoteAsMarkdown,
          children: (
            <Flex justifyContent="space-between">
              as Markdown <Markdown />
            </Flex>
          ),
        },
      ],
    },

    {
      id: "copy",
      onClick: copyNoteReference,
      children: (
        <>
          <Clipboard size={15} /> Copy reference
        </>
      ),
    },
  ];

  const menu = selectedNote?.trash
    ? [
        {
          id: "trash",
          onClick: toggleNoteTrash,
          children: (
            <>
              <ArrowBack size={15} /> Restore note
            </>
          ),
        },
        {
          id: "delete",
          onClick: deleteNote,
          danger: true,
          children: (
            <>
              <Trash size={15} /> Delete permanently
            </>
          ),
        },
      ]
    : [
        {
          id: "select",
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
          id: "pin",
          onClick: toggleNotePin,
          children: (
            <>
              <Pin size={15} /> {selectedNote?.pinned ? "Remove Pin" : "Add Pin"}
            </>
          ),
        },
        {
          id: "move",
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
      <Dropdown selected={selected} menu={[...menu, ...staticMenuOptions]} />
    </ContextMenu>
  );
};

import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { editingSelector, splitSelector } from "@/recoil/editor.recoil";
import { selectNoteIdSelector, selectedNoteSelector } from "@/recoil/notes.recoil";
import { sectionsSelector } from "@/recoil/sections.recoil";
import { themeSelector } from "@/recoil/settings.recoil";
import { Note } from "@/recoil/types";

import { Section } from "@/utils/enums";
import { downloadMarkdown, downloadPdf } from "@/utils/exports";
import { copyToClipboard } from "@/utils/helpers";
import { useWindowDimensions } from "@/utils/hooks/useWindowDimensions";

import {
  ArrowBack,
  Clipboard,
  Download,
  Edit,
  Eye,
  FilledPin,
  Markdown,
  Moon,
  PDF,
  Pin,
  Split,
  Sun,
  Trash,
} from "@/components/Icons";
import { Popover } from "@/components/Popover";

import { Flex } from "@/styles/layout";

import { TopNav, TopNavButton } from "./styled";

type Props = {
  note?: Note;
};

export const EditorBar = ({ note }: Props) => {
  const { isSmallDevice } = useWindowDimensions();
  const [uuidCopiedText, setUuidCopiedText] = useState<string>("");
  const setNoteState = useSetRecoilState(selectedNoteSelector);
  const [theme, toggleTheme] = useRecoilState(themeSelector);
  const [editing, setEditing] = useRecoilState(editingSelector);
  const [split, setSplit] = useRecoilState(splitSelector);
  const setSelectedNote = useSetRecoilState(selectNoteIdSelector);
  const setSection = useSetRecoilState(sectionsSelector);
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
    setEditing(false);
    setSplit(false);
    setSelectedNote(null);
    setSection(Section.LIST);
  };

  const toggleEdit = () => !!note && setEditing(!editing);
  const toggleSplit = () => !!note && setSplit(!split);

  const copyNoteId = () => {
    !!note && copyToClipboard(`{{${note.id}}}`);
    setUuidCopiedText(successfulCopyMessage);
  };

  const downloadNoteAsPDF = () => !!note && downloadPdf(note);

  const downloadNoteAsMarkdown = () => {
    !!note && downloadMarkdown(note);
  };

  const popoverMenu = [
    {
      id: "pdf",
      onClick: downloadNoteAsPDF,
      children: (
        <>
          as PDF <PDF />
        </>
      ),
    },
    {
      id: "markdown",
      onClick: downloadNoteAsMarkdown,
      children: (
        <>
          as Markdown <Markdown />
        </>
      ),
    },
  ];

  useEffect(() => {
    if (uuidCopiedText === successfulCopyMessage) {
      const timer = setTimeout(() => {
        setUuidCopiedText("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [uuidCopiedText]);

  return (
    <TopNav>
      <Flex height="100%">
        {!!note && (
          <>
            <TopNavButton title="Toggle editing" onClick={toggleEdit}>
              {editing ? <Eye size={18} /> : <Edit size={18} />}
            </TopNavButton>
            {editing && !isSmallDevice && (
              <TopNavButton primary={split} title="Toggle split screen" onClick={toggleSplit}>
                <Split size={18} />
              </TopNavButton>
            )}
            <TopNavButton primary={note?.pinned} title="Pin note" onClick={toggleNotePin}>
              {note?.pinned ? <FilledPin size={18} /> : <Pin size={18} />}
            </TopNavButton>

            <TopNavButton trash title="Delete note" onClick={deleteNote}>
              {note.trash ? <ArrowBack size={18} /> : <Trash size={18} />}
            </TopNavButton>
            <Popover menu={popoverMenu}>
              <TopNavButton title="Download note">
                <Download size={18} />
              </TopNavButton>
            </Popover>
            <TopNavButton title="Copy note ID" onClick={copyNoteId}>
              <Clipboard size={18} />
              <span>{uuidCopiedText}</span>
            </TopNavButton>
          </>
        )}
      </Flex>
      <Flex height="100%" justifyContent="flex-end">
        <TopNavButton
          title="Change theme"
          onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </TopNavButton>
      </Flex>
    </TopNav>
  );
};

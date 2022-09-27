import { MarkdownPreviewRef } from "@uiw/react-markdown-preview";
import { ReactNode, Ref, UIEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

import { previewerThemeSelector, renderHTMLSelector } from "@/recoil/editor.recoil";
import { folderState } from "@/recoil/folder.recoil";
import { notesSelector, selectNoteIdSelector } from "@/recoil/notes.recoil";
import { themeSelector } from "@/recoil/settings.recoil";
import { Note } from "@/recoil/types";

import { previewThemes } from "@/utils/editorThemes";
import { Folder } from "@/utils/enums";

import { NoteLink } from "@/components/NotePreviewer/NoteLink";

import { Previewer } from "./style";

type Props = {
  innerRef?: Ref<MarkdownPreviewRef>;
  previewNote: Note;
  border?: boolean;
  onScroll?: (e: UIEvent<HTMLDivElement, UIEvent>) => void;
};

export const NotePreview = ({ innerRef, previewNote, border, onScroll }: Props) => {
  const theme = useRecoilValue(themeSelector);
  const previewerTheme = useRecoilValue(previewerThemeSelector);
  const renderHtml = useRecoilValue(renderHTMLSelector);
  const notes = useRecoilValue(notesSelector);
  const setSelectedNoteId = useSetRecoilState(selectNoteIdSelector);
  const setActiveFolder = useSetRecoilState(folderState);

  const handleNoteLinkClick = (note: Note) => {
    if (note) {
      setSelectedNoteId(note.id);

      if (note?.pinned) return setActiveFolder(Folder.PINNED);
      if (note?.trash) return setActiveFolder(Folder.TRASH);

      return setActiveFolder(Folder.ALL);
    }
  };

  const returnNoteLink = (value = "", originalText: ReactNode) => {
    return (
      <NoteLink
        uuid={value}
        originalText={originalText}
        notes={notes}
        handleNoteLinkClick={handleNoteLinkClick}
      />
    );
  };

  return (
    <Previewer
      ref={innerRef}
      border={border}
      remarkPlugins={[remarkParse, remarkGfm, remarkBreaks]}
      rehypePlugins={renderHtml ? [rehypeRaw] : []}
      components={{
        a: ({ href, children }) => returnNoteLink(href, children),
      }}
      source={previewNote.text.replaceAll("{{", "[](https://uuid:").replaceAll("}}", ")")}
      // eslint-disable-next-line
      // @ts-ignore
      onScroll={onScroll}
    />
  );
};

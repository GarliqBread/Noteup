import { NoteLink } from "@noteup/shared/components/NotePreviewer/NoteLink";
import { previewerThemeSelector, renderHTMLSelector } from "@noteup/shared/recoil/editor.recoil";
import { folderState } from "@noteup/shared/recoil/folder.recoil";
import { notesSelector, selectNoteIdSelector } from "@noteup/shared/recoil/notes.recoil";
import { themeSelector } from "@noteup/shared/recoil/settings.recoil";
import { Note } from "@noteup/shared/recoil/types";
import { previewThemes } from "@noteup/shared/utils/editorThemes";
import { Folder } from "@noteup/shared/utils/enums";
import { ReactNode, Ref, UIEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Previewer, PreviewerWrapper } from "./style";

type Props = {
  innerRef?: Ref<HTMLDivElement>;
  previewNote: Note;
  border?: boolean;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
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
    <PreviewerWrapper ref={innerRef} onScroll={(e) => onScroll && onScroll(e)}>
      <Previewer
        className="previewer"
        border={border}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={renderHtml ? [rehypeRaw] : []}
        components={{
          a: ({ href, children }) => returnNoteLink(href, children),
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                // eslint-disable-next-line
                // @ts-ignore
                style={previewThemes[theme][previewerTheme]}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        children={previewNote.text.replaceAll("{{", "[](https://uuid:").replaceAll("}}", ")")}
      />
    </PreviewerWrapper>
  );
};

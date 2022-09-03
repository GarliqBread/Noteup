import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import breaks from "remark-breaks";
import gfm from "remark-gfm";

import { previewerThemeSelector } from "recoil/editor.recoil";
import { folderState } from "recoil/folder.recoil";
import { notesState, selectNoteIdSelector } from "recoil/notes.recoil";
import { themeSelector } from "recoil/settings.recoil";
import { Note } from "recoil/types";

import { previewThemes } from "utils/editorThemes";
import { Folder } from "utils/enums";
import { uuidPlugin } from "utils/reactMarkdownPlugins";

import { NoteLink } from "components/NotePreviewer/NoteLink";

import { Previewer } from "./style";

type Props = {
  previewNote: Note;
};
export const NotePreview = ({ previewNote }: Props) => {
  const theme = useRecoilValue(themeSelector);
  const previewerTheme = useRecoilValue(previewerThemeSelector);
  const { notes } = useRecoilValue(notesState);
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
      remarkPlugins={[gfm, uuidPlugin, breaks]}
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
  );
};

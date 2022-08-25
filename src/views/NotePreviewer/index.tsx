import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRecoilValue, useSetRecoilState } from "recoil";
import breaks from "remark-breaks";
import gfm from "remark-gfm";

import { activeFolderSelector } from "recoil/folder.recoil";
import { notesState, selectNoteIdSelector } from "recoil/notes.recoil";
import { themeSelector } from "recoil/settings.recoil";
import { Note } from "recoil/types";

import { Folder } from "utils/enums";
import { uuidPlugin } from "utils/reactMarkdownPlugins";

import { NoteLink } from "components/NotePreviewer/NoteLink";

import { Previewer } from "./style";

type Props = {
  previewNote: Note;
};
export const NotePreview = ({ previewNote }: Props) => {
  const theme = useRecoilValue(themeSelector);
  const { notes } = useRecoilValue(notesState);
  const setSelectedNote = useSetRecoilState(selectNoteIdSelector);
  const setActiveFolder = useSetRecoilState(activeFolderSelector);

  const handleNoteLinkClick = (e: React.SyntheticEvent, note: Note) => {
    e.preventDefault();

    if (note) {
      setSelectedNote(note.id);

      if (note?.pinned) return setActiveFolder(Folder.PINNED);
      if (note?.scratchpad) return setActiveFolder(Folder.SCRATCH);
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
              style={theme === "dark" ? oneDark : oneLight}
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

import { ReactNode } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { folderState } from "recoil/folder.recoil";
import { notesState, selectNoteIdSelector } from "recoil/notes.recoil";
import { Note } from "recoil/types";
import gfm from "remark-gfm";

import { Folder } from "utils/enums";
import { uuidPlugin } from "utils/reactMarkdownPlugins";

import NoteLink from "./NoteLink";
import { Previewer } from "./style";

type Props = {
  previewNote: Note;
};
export const NotePreview = ({ previewNote }: Props) => {
  const { notes } = useRecoilValue(notesState);
  const setSelectedNote = useSetRecoilState(selectNoteIdSelector);
  const setActiveFolder = useSetRecoilState(folderState);

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
      remarkPlugins={[gfm, uuidPlugin]}
      components={{
        a: ({ href, children }) => returnNoteLink(href, children),
      }}
      children={previewNote.text.replaceAll("{{", "[](https://uuid:").replaceAll("}}", ")")}
    />
  );
};

import { ReactNode } from "react";

import { Note } from "@/recoil/types";

import { getNoteTitle } from "@/utils/helpers";

export interface NoteLinkProps {
  uuid: string;
  originalText: ReactNode;
  notes: Note[];
  handleNoteLinkClick: (note: Note) => void;
}

export const NoteLink = ({ notes, uuid, originalText, handleNoteLinkClick }: NoteLinkProps) => {
  if (!uuid.includes("https://uuid:")) {
    return (
      <a target="_blank" href={uuid}>
        {originalText}
      </a>
    );
  }
  const id = uuid.split("uuid:")[1];
  const note = notes.find((note) => note.id === id);
  const title = note !== undefined ? getNoteTitle(note.text) : null;

  if (note && title) return <a onClick={() => handleNoteLinkClick(note)}>{title}</a>;
  return <>{`{{${id}}}`}</>;
};

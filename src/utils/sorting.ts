import { Note } from "@/recoil/types";

import { NotesSortKey } from "./enums";
import { getNoteTitle } from "./helpers";

export type NotesSortStrategy = {
  sort: (a: Note, b: Note) => number;
};

const withPinned = (sortFunction: NotesSortStrategy["sort"]) => (a: Note, b: Note) => {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;

  return sortFunction(a, b);
};

const createdDate: NotesSortStrategy = {
  sort: (a: Note, b: Note): number => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);

    return dateA < dateB ? 1 : -1;
  },
};

const lastUpdated: NotesSortStrategy = {
  sort: (a: Note, b: Note): number => {
    const dateA = new Date(a.lastUpdated);
    const dateB = new Date(b.lastUpdated);

    return dateA < dateB ? 1 : -1;
  },
};

const title: NotesSortStrategy = {
  sort: (a: Note, b: Note): number => {
    const titleA = getNoteTitle(a.text);
    const titleB = getNoteTitle(b.text);

    if (titleA === titleB) return 0;

    return titleA > titleB ? 1 : -1;
  },
};

export const sortStrategyMap: { [key in NotesSortKey]: NotesSortStrategy } = {
  [NotesSortKey.LAST_UPDATED]: lastUpdated,
  [NotesSortKey.TITLE]: title,
  [NotesSortKey.CREATED_DATE]: createdDate,
};

export const getNotesSorter = (notesSortKey: NotesSortKey) =>
  withPinned(sortStrategyMap[notesSortKey].sort);

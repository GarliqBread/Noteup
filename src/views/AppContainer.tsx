import { instance } from "@/api";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { tokenSelector } from "@/recoil/auth.recoil";
import { noteSyncSelector } from "@/recoil/notes.recoil";
import { Note } from "@/recoil/types";

import { NoteContainer } from "@/views/NoteContainer";
import { SettingsModal } from "@/views/SettingsModal";

import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { MobileNav } from "@/components/MobileNav";
import { NoteList } from "@/components/NoteList";
import { Sidebar } from "@/components/Sidebar";
import { SplitPane } from "@/components/SplitPanel";

import { Container } from "@/styles/layout";

export const AppContainer = () => {
  const token = useRecoilValue(tokenSelector);
  const [notes, setNotes] = useRecoilState(noteSyncSelector);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (token) {
      console.log(notes);
      setTimeout(() => {
        axios
          .all(
            notes
              .filter((note) => note.toSync)
              .map((note) =>
                note.id
                  ? instance.put(`/notes/${note.id}/`, note)
                  : instance.post("/notes/", {
                      ...note,
                      categoryId: null,
                    }),
              ),
          )
          .then((res: AxiosResponse<Note, Note>[]) =>
            res.map((result) => {
              const note = result.data || result;
              setNotes([
                {
                  ...note,
                  toSync: true,
                },
              ]);
            }),
          );
      }, 500);
    }
  }, [token]);

  return (
    <Container>
      <MobileNav openSettings={() => setShowSettings(true)} />
      <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={200}>
        <Sidebar showSettings={() => setShowSettings(true)} />
        <SplitPane split="vertical" minSize={200} maxSize={300} defaultSize={250}>
          <NoteList />
          <NoteContainer />
        </SplitPane>
      </SplitPane>
      <KeyboardShortcuts />
      {showSettings && <SettingsModal closeModal={() => setShowSettings(false)} />}
    </Container>
  );
};

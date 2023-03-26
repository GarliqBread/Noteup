import { useState } from "react";

import { NoteContainer } from "@/pages/Notebook/NoteContainer";
import { SettingsModal } from "@/pages/Notebook/SettingsModal";

import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { MobileNav } from "@/components/MobileNav";
import { NoteList } from "@/components/NoteList";
import { Sidebar } from "@/components/Sidebar";
import { SplitPane } from "@/components/SplitPanel";

import { Container } from "@/styles/layout";

export const Notebook = () => {

  return (
    <Container>
      <SplitPane split="vertical" minSize={0} maxSize={300} defaultSize={200}>
        <Sidebar />
        <SplitPane split="vertical" minSize={0} maxSize={300} defaultSize={250}>
          <NoteList />
          <NoteContainer />
        </SplitPane>
      </SplitPane>
      <KeyboardShortcuts />
    </Container>
  );
};

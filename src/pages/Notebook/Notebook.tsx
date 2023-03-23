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
  const [showSettings, setShowSettings] = useState(false);

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

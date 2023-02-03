import { useState } from "react";

import { NoteContainer } from "@/views/NoteContainer";
import { SettingsModal } from "@/views/SettingsModal";

import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { MobileNav } from "@/components/MobileNav";
import { NoteList } from "@/components/NoteList";
import { Sidebar } from "@/components/Sidebar";
import { SplitPane } from "@/components/SplitPanel";

import { Container } from "@/styles/layout";

import { AuthModal } from "./AuthModal";

export const AppContainer = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <Container>
      <MobileNav openSettings={() => setShowSettings(true)} />
      <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={200}>
        <Sidebar showSettings={() => setShowSettings(true)} showAuth={() => setShowAuth(true)} />
        <SplitPane split="vertical" minSize={200} maxSize={300} defaultSize={250}>
          <NoteList />
          <NoteContainer />
        </SplitPane>
      </SplitPane>
      <KeyboardShortcuts />
      {showSettings && <SettingsModal onModalClose={() => setShowSettings(false)} />}
      {showAuth && <AuthModal onModalClose={() => setShowAuth(false)} />}
    </Container>
  );
};

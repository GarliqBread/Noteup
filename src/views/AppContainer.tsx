import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

import { isTauri } from "@/utils/helpers";

import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { MobileNav } from "@/components/MobileNav";
import { NoteList } from "@/components/NoteList";
import { Sidebar } from "@/components/Sidebar";
import { SplitPane } from "@/components/SplitPanel";

import { NoteContainer } from "./NoteContainer";
import { SettingsModal } from "./SettingsModal";

import { Container } from "@/styles/layout";

export const AppContainer = () => {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (isTauri) {
      // On mount open the tauri application
      invoke("show_main_window");
    }
  }, []);

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

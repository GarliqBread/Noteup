import { useState } from "react";
import { useRecoilValue } from "recoil";

import { folderState } from "recoil/folder.recoil";

import { getNoteBarConf } from "utils/helpers";

import { KeyboardShortcuts } from "components/KeyboardShortcuts";
import { MobileNav } from "components/MobileNav";
import { NoteList } from "components/NoteList";
import { Sidebar } from "components/Sidebar";
import { SplitPane } from "components/SplitPanel";

import { NoteContainer } from "./NoteContainer";
import { SettingsModal } from "./SettingsModal";

import { Container } from "styles/layout";

export const AppContainer = () => {
  const activeFolder = useRecoilValue(folderState);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Container>
      <MobileNav />
      <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={200}>
        <Sidebar />
        <SplitPane split="vertical" {...getNoteBarConf(activeFolder)}>
          <NoteList />
          <NoteContainer openSettings={() => setShowSettings(true)} />
        </SplitPane>
      </SplitPane>
      <KeyboardShortcuts />
      {showSettings && <SettingsModal closeModal={() => setShowSettings(false)} />}
    </Container>
  );
};

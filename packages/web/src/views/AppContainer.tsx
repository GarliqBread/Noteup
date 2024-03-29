import { NoteList } from "@noteup/shared/components/NoteList";
import { Sidebar } from "@noteup/shared/components/Sidebar";
import { SplitPane } from "@noteup/shared/components/SplitPanel";
import { fullScreenSelector } from "@noteup/shared/recoil/screen.recoil";
import { Container } from "@noteup/shared/styles/layout";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { downloadMarkdown, downloadPdf } from "@/utils/exports";

import { NoteContainer } from "@/views/NoteContainer";
import { SettingsModal } from "@/views/SettingsModal";

import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { MobileNav } from "@/components/MobileNav";

export const AppContainer = () => {
  const [showSettings, setShowSettings] = useState(false);
  const isFullScreen = useRecoilValue(fullScreenSelector);

  return (
    <Container>
      {isFullScreen ? (
        <NoteContainer />
      ) : (
        <>
          <MobileNav openSettings={() => setShowSettings(true)} />
          <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={200}>
            <Sidebar showSettings={() => setShowSettings(true)} />
            <SplitPane split="vertical" minSize={200} maxSize={300} defaultSize={250}>
              <NoteList downloadMarkdown={downloadMarkdown} downloadPdf={downloadPdf} />
              <NoteContainer />
            </SplitPane>
          </SplitPane>
          <KeyboardShortcuts />
          {showSettings && <SettingsModal closeModal={() => setShowSettings(false)} />}
        </>
      )}
    </Container>
  );
};

import { useState } from "react";
import SplitPane from "react-split-pane";
import { useRecoilState, useRecoilValue } from "recoil";
import { folderState } from "recoil/folder.recoil";
import { selectedNoteSelector } from "recoil/notes.recoil";
import { FlexColumn } from "styles/layout";
import { SettingsModal } from "views/SettingsModal";

import { Folder } from "utils/enums";
import { getNoteBarConf } from "utils/helpers";

import { NoteEditor } from "./NoteEditor";
import { NoteList } from "./NoteList";
import { NotePreview } from "./NotePreviewer";
import { SettingsBar } from "./SettingsBar";
import { Sidebar } from "./Sidebar";

export const AppContainer = () => {
  const [editing, setEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const activeFolder = useRecoilValue(folderState);
  const [note, setNote] = useRecoilState(selectedNoteSelector);

  return (
    <div className="app-container">
      <SplitPane split="vertical" minSize={150} maxSize={500} defaultSize={240}>
        <Sidebar />
        <SplitPane split="vertical" {...getNoteBarConf(activeFolder)}>
          {activeFolder !== Folder.SCRATCH && <NoteList />}
          {!!note && (
            <FlexColumn justifyContent="space-between" alignItems="initial" height="100vh">
              {!editing && <NotePreview previewNote={note} />}
              {editing && <NoteEditor note={note} setNote={setNote} />}
              <SettingsBar
                note={note}
                editing={editing}
                setEditing={() => setEditing((prev) => !prev)}
                toggleModal={() => setShowSettings(true)}
              />
            </FlexColumn>
          )}
        </SplitPane>
      </SplitPane>
      {showSettings && <SettingsModal closeModal={() => setShowSettings(false)} />}
    </div>
  );
};

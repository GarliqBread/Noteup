import { useState } from "react";
import SplitPane from "react-split-pane";
import { useRecoilState, useRecoilValue } from "recoil";
import { folderState } from "recoil/folder.recoil";
import { selectedNoteSelector } from "recoil/notes.recoil";
import { FlexColumn } from "styles/layout";
import { NoteEditor } from "views/NoteEditor";
import { NotePreview } from "views/NotePreviwer";
import { SettingsModal } from "views/SettingsModal";

import { Folder } from "utils/enums";
import { getNoteBarConf } from "utils/helpers";

import { NoteList } from "components/NoteList";
import { SettingsBar } from "components/SettingsBar";
import { Sidebar } from "components/Sidebar";

export const AppContainer = () => {
  const [editing, setEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const activeFolder = useRecoilValue(folderState);
  const [note, setNote] = useRecoilState(selectedNoteSelector);

  return (
    <div className="app-container">
      <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={240}>
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

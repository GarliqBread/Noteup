import { useState } from "react";
import SplitPane from "react-split-pane";
import { useRecoilState, useRecoilValue } from "recoil";

import { editingSelector } from "recoil/editor.recoil";
import { folderState } from "recoil/folder.recoil";
import { selectedNoteSelector } from "recoil/notes.recoil";

import { getNoteBarConf } from "utils/helpers";

import { NoteEditor } from "views/NoteEditor";
import { NotePreview } from "views/NotePreviewer";
import { SettingsModal } from "views/SettingsModal";

import { KeyboardShortcuts } from "components/KeyboardShortcuts";
import { NoteList } from "components/NoteList";
import { SettingsBar } from "components/SettingsBar";
import { Sidebar } from "components/Sidebar";

import { FlexColumn } from "styles/layout";

export const AppContainer = () => {
  const [editing, setEditing] = useRecoilState(editingSelector);
  const [showSettings, setShowSettings] = useState(false);
  const activeFolder = useRecoilValue(folderState);
  const [note, setNote] = useRecoilState(selectedNoteSelector);

  return (
    <div className="app-container">
      <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={240}>
        <Sidebar />
        <SplitPane split="vertical" {...getNoteBarConf(activeFolder)}>
          {<NoteList />}
          <FlexColumn justifyContent="space-between" alignItems="initial" height="100vh">
            {note ? (
              <>
                {!editing && <NotePreview previewNote={note} />}
                {editing && <NoteEditor note={note} setNote={setNote} />}
              </>
            ) : (
              <div />
            )}
            <SettingsBar
              note={note}
              editing={editing}
              setEditing={() => setEditing((prev) => !prev)}
              toggleModal={() => setShowSettings(true)}
            />
          </FlexColumn>
        </SplitPane>
      </SplitPane>
      {showSettings && <SettingsModal closeModal={() => setShowSettings(false)} />}
      <KeyboardShortcuts />
    </div>
  );
};

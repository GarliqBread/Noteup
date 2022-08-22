import { useState } from "react";
import SplitPane from "react-split-pane";
import { useRecoilState, useRecoilValue } from "recoil";
import { folderState } from "recoil/folder.recoil";
import { selectedNoteSelector } from "recoil/notes.recoil";

import { Folder } from "utils/enums";
import { getNoteBarConf } from "utils/helpers";

import { NoteEditor } from "./NoteEditor";
import { NoteList } from "./NoteList";
import { NotePreview } from "./NotePreviewer";
import { Sidebar } from "./Sidebar";

export const AppContainer = () => {
  const [editing, setEditing] = useState(false);
  const activeFolder = useRecoilValue(folderState);
  const [note, setNote] = useRecoilState(selectedNoteSelector);

  return (
    <div className="app-container">
      <SplitPane split="vertical" minSize={150} maxSize={500} defaultSize={240}>
        <Sidebar />
        <SplitPane split="vertical" {...getNoteBarConf(activeFolder)}>
          {activeFolder !== Folder.SCRATCH && <NoteList />}
          {note && !editing && <NotePreview previewNote={note} />}
          {note && editing && <NoteEditor note={note} setNote={setNote} />}
        </SplitPane>
      </SplitPane>
    </div>
  );
};

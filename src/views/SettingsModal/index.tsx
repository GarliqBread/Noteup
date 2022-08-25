import { useRecoilState } from "recoil";

import { categoriesSelector } from "recoil/categories.recoil";
import {
  autoCompleteSelector,
  breakLinesSelector,
  editorThemeSelector,
  foldGutterSelector,
  lineNumbersSelector,
} from "recoil/editor.recoil";
import { notesSelector } from "recoil/notes.recoil";
import { sortKeySelector, themeSelector } from "recoil/settings.recoil";
import { Category, Note } from "recoil/types";

import { notesSortOptions, shortcutMap, themeEditorOptions } from "utils/constants";
import { EditorThemeKey, LabelText, NotesSortKey } from "utils/enums";
import { backupNotes, downloadNotes } from "utils/helpers";

import { Button, IconButton, UploadButton } from "components/Button";
import {
  Close,
  CloudDownload,
  CloudUpload,
  Download,
  Gear,
  HardDrive,
  Keyboard,
} from "components/Icons";
import { Option } from "components/SettingsModal/Option";
import { SelectOptions } from "components/SettingsModal/SelectOption";
import { Shortcut } from "components/SettingsModal/Shortcut";
import { TabPanel } from "components/Tabs/TabPanel";
import { Tabs } from "components/Tabs/Tabs";

import { Modal, ModalHeader, Overlay, Wrapper } from "./styled";

type Props = {
  closeModal: () => void;
};

export const SettingsModal = ({ closeModal }: Props) => {
  const [theme, setTheme] = useRecoilState(themeSelector);
  const [sortKey, setSortKey] = useRecoilState(sortKeySelector);
  const [autoComplete, setAutoComplete] = useRecoilState(autoCompleteSelector);
  const [lineNumbers, setLineNumbers] = useRecoilState(lineNumbersSelector);
  const [breakLines, setBreakLines] = useRecoilState(breakLinesSelector);
  const [foldGutter, setFoldGutter] = useRecoilState(foldGutterSelector);
  const [editorTheme, setEditorTheme] = useRecoilState(editorThemeSelector);
  const [notes, setNotes] = useRecoilState(notesSelector);
  const [categories, setCategories] = useRecoilState(categoriesSelector);

  const toggleLineNumbers = () => setLineNumbers(!lineNumbers);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleAutoComplete = () => setAutoComplete(!autoComplete);
  const toggleBreakLines = () => setBreakLines(!breakLines);
  const toggleFoldGutter = () => setFoldGutter(!foldGutter);

  const importBackup = async (json: File) => {
    const content = await json.text();
    const { notes, categories } = JSON.parse(content) as {
      notes: Note[];
      categories: Category[];
    };

    if (!notes || !categories) return;

    setNotes(notes);
    setCategories(categories);
  };

  return (
    <Wrapper>
      <Overlay onClick={closeModal} />
      <Modal>
        <ModalHeader>
          Settings
          <IconButton title="Close modal" onClick={closeModal}>
            <Close size={18} />
          </IconButton>
        </ModalHeader>
        <Tabs>
          <TabPanel label="Preferences" icon={Gear}>
            <Option
              title="Display line numbers"
              description="Controls whether the editor should display line numbers"
              toggle={toggleLineNumbers}
              checked={lineNumbers}
            />
            <Option
              title="Auto-complete"
              description="Controls the editor's auto-complete function"
              toggle={toggleAutoComplete}
              checked={autoComplete}
            />
            <Option
              title="Break lines"
              description="Controls whether the editor should break lines"
              toggle={toggleBreakLines}
              checked={breakLines}
            />
            <Option
              title="Fold gutter"
              description="Controls wether the editor allows gutter folding"
              toggle={toggleFoldGutter}
              checked={foldGutter}
            />
            <Option
              title="Dark mode"
              description="Controls the theme of the application and editor"
              toggle={toggleTheme}
              checked={theme === "dark"}
            />
            <SelectOptions
              title="Sort By"
              description="Controls the sort strategy of the notes"
              onChange={(key) => setSortKey(key as NotesSortKey)}
              options={notesSortOptions}
              value={sortKey}
            />
            <SelectOptions
              title="Editor theme"
              description="Controls the theme for the markdown editor"
              onChange={(key) => setEditorTheme(key as EditorThemeKey)}
              options={themeEditorOptions}
              value={editorTheme}
            />
          </TabPanel>
          <TabPanel label="Data management" icon={HardDrive}>
            <p>Download all notes as Markdown files in a zip.</p>
            <Button
              variant="primary"
              title="Download notes"
              onClick={() => downloadNotes(notes, categories)}
            >
              <Download size={18} /> {LabelText.DOWNLOAD_ALL_NOTES}
            </Button>
            <p>Export Noteup data as JSON.</p>
            <Button
              variant="primary"
              title="Export backup"
              onClick={() => backupNotes(notes, categories)}
            >
              <CloudDownload size={18} /> {LabelText.BACKUP_ALL_NOTES}
            </Button>
            <p>Import Noteup JSON file.</p>
            <UploadButton variant="primary" title="Import backup" onUpload={importBackup}>
              <CloudUpload size={18} /> {LabelText.IMPORT_BACKUP}
            </UploadButton>
          </TabPanel>
          <TabPanel label="Keyboard shortcuts" icon={Keyboard}>
            {shortcutMap.map((shortcut) => (
              <Shortcut action={shortcut.action} letter={shortcut.key} key={shortcut.key} />
            ))}
          </TabPanel>
        </Tabs>
      </Modal>
    </Wrapper>
  );
};

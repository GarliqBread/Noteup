import { useRecoilState } from "recoil";

import { categoriesSelector } from "recoil/categories.recoil";
import {
  autoCompleteSelector,
  breakLinesSelector,
  editorThemeSelector,
  foldGutterSelector,
  lineNumbersSelector,
  previewerThemeSelector,
  renderHTMLSelector,
} from "recoil/editor.recoil";
import { notesSelector } from "recoil/notes.recoil";
import { sortKeySelector, themeSelector } from "recoil/settings.recoil";
import { Category, Note } from "recoil/types";

import {
  notesSortOptions,
  shortcutMap,
  themeEditorOptions,
  themePreviewOptions,
} from "utils/constants";
import { EditorThemeKey, LabelText, NotesSortKey, PreviewThemeKey } from "utils/enums";
import { backupNotes } from "utils/helpers";

import { Button, IconButton, UploadButton } from "components/Button";
import { Close, CloudDownload, CloudUpload, HardDrive, Keyboard, Sliders } from "components/Icons";
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
  const [previewerTheme, setPreviewerTheme] = useRecoilState(previewerThemeSelector);
  const [renderHTML, setRenderHTML] = useRecoilState(renderHTMLSelector);
  const [notes, setNotes] = useRecoilState(notesSelector);
  const [categories, setCategories] = useRecoilState(categoriesSelector);

  const toggleLineNumbers = () => setLineNumbers(!lineNumbers);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleAutoComplete = () => setAutoComplete(!autoComplete);
  const toggleBreakLines = () => setBreakLines(!breakLines);
  const toggleFoldGutter = () => setFoldGutter(!foldGutter);
  const toggleRenderHTML = () => setRenderHTML(!renderHTML);

  const importBackup = async (json: File) => {
    const content = await json.text();
    const { notes, categories } = JSON.parse(content) as {
      notes: Note[];
      categories: Category[];
    };

    if (!notes || !categories) return;

    setNotes(notes);
    setCategories(categories);
    closeModal();
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
          <TabPanel label="Preferences" icon={Sliders}>
            <Option
              title="Display line numbers"
              description="Editor's line numbers"
              toggle={toggleLineNumbers}
              checked={lineNumbers}
            />
            <Option
              title="Auto-complete"
              description="Editor's auto-complete"
              toggle={toggleAutoComplete}
              checked={autoComplete}
            />
            <Option
              title="Break lines"
              description="Break lines on the editor"
              toggle={toggleBreakLines}
              checked={breakLines}
            />
            <Option
              title="Fold gutter"
              description="Fold gutters on the editor"
              toggle={toggleFoldGutter}
              checked={foldGutter}
            />
            <Option
              title="Render HTML"
              description="Renders HTML in the previewer"
              toggle={toggleRenderHTML}
              checked={renderHTML}
            />
            <Option
              title="Dark mode"
              description="Application's theme"
              toggle={toggleTheme}
              checked={theme === "dark"}
            />
            <SelectOptions
              title="Sort By"
              description="Notes list sorting strategy"
              onChange={(key) => setSortKey(key as NotesSortKey)}
              options={notesSortOptions}
              value={sortKey}
            />
            <SelectOptions
              title="Editor theme"
              description="Markdown editor's theme"
              onChange={(key) => setEditorTheme(key as EditorThemeKey)}
              options={themeEditorOptions}
              value={editorTheme}
            />
            <SelectOptions
              title="Previewer theme"
              description="Markdown preview's theme"
              onChange={(key) => setPreviewerTheme(key as PreviewThemeKey)}
              options={themePreviewOptions}
              value={previewerTheme}
            />
          </TabPanel>
          <TabPanel label="Data management" icon={HardDrive}>
            <p>Export Noteup data as JSON.</p>
            <Button
              className="download-button"
              variant="primary"
              title="Export backup"
              onClick={() => backupNotes(notes, categories)}
            >
              <CloudDownload size={18} /> {LabelText.BACKUP_ALL_NOTES}
            </Button>
            <p>Import Noteup JSON file.</p>
            <UploadButton
              className="download-button"
              variant="primary"
              title="Import backup"
              onUpload={importBackup}
            >
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

import { useRecoilState } from "recoil";
import { settingsState } from "recoil/settings.recoil";

import { IconButton } from "components/Button";
import { Close, Gear } from "components/Icons";
import { Option } from "components/SettingsModal/Option";
import { TabPanel } from "components/Tabs/TabPanel";
import { Tabs } from "components/Tabs/Tabs";

import { Modal, ModalHeader, Overlay, Wrapper } from "./styled";

type Props = {
  closeModal: () => void;
};

export const SettingsModal = ({ closeModal }: Props) => {
  const [settings, setSettings] = useRecoilState(settingsState);

  const toggleLineNumbers = () =>
    setSettings({
      ...settings,
      lineNumbers: !settings.lineNumbers,
    });

  const toggleTheme = () =>
    setSettings({
      ...settings,
      theme: settings.theme === "light" ? "dark" : "light",
    });

  const toggleAutoComplete = () =>
    setSettings({
      ...settings,
      autoComplete: !settings.autoComplete,
    });

  const toggleBreakLines = () =>
    setSettings({
      ...settings,
      breakLines: !settings.breakLines,
    });

  const toggleFoldGutter = () =>
    setSettings({
      ...settings,
      foldGutter: !settings.foldGutter,
    });

  const toggleInputIndent = () =>
    setSettings({
      ...settings,
      indentOnInput: !settings.indentOnInput,
    });

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
              checked={settings.lineNumbers}
            />
            <Option
              title="Auto-complete"
              description="Controls the editor's auto-complete function"
              toggle={toggleAutoComplete}
              checked={settings.autoComplete}
            />
            <Option
              title="Break lines"
              description="Controls whether the editor should break lines"
              toggle={toggleBreakLines}
              checked={settings.breakLines}
            />
            <Option
              title="Fold gutter"
              description="Controls wether the editor allows gutter folding"
              toggle={toggleFoldGutter}
              checked={settings.foldGutter}
            />
            <Option
              title="Indent on input"
              description="Controls wether the editor should indent on input"
              toggle={toggleInputIndent}
              checked={settings.indentOnInput}
            />
            <Option
              title="Dark mode"
              description="Controls the theme of the application and editor"
              toggle={toggleTheme}
              checked={settings.theme === "dark"}
            />

            {/* <SelectOptions
                title="Sort By"
                description="Controls the sort strategy of the notes"
                onChange={updateNotesSortStrategyHandler}
                options={notesSortOptions}
                selectedValue={notesSortKey}
                testId={TestID.SORT_BY_DROPDOWN}
              />
              <SelectOptions
                title="Text direction"
                description="Controls the direction of the text"
                onChange={updateNotesDirectionHandler}
                options={directionTextOptions}
                selectedValue={codeMirrorOptions.direction}
                testId={TestID.TEXT_DIRECTION_DROPDOWN}
              /> */}
          </TabPanel>
          <TabPanel label="Nothing" icon={Gear}>
            <div />
          </TabPanel>
        </Tabs>
      </Modal>
    </Wrapper>
  );
};

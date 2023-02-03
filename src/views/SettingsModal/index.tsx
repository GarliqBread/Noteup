import { shortcutMap } from "@/utils/constants";

import { HardDrive, Keyboard, Sliders } from "@/components/Icons";
import { Modal } from "@/components/Modal";
import { Shortcut } from "@/components/SettingsModal/Shortcut";
import { TabPanel } from "@/components/Tabs/TabPanel";
import { Tabs } from "@/components/Tabs/Tabs";

import { DataManagementPanel } from "./panels/DataManagementPanel";
import { PreferencesPanel } from "./panels/Preferences";
import { Version } from "./styled";

type Props = {
  onModalClose: () => void;
};

export const SettingsModal = ({ onModalClose }: Props) => {
  return (
    <Modal header="Settings" onModalClose={onModalClose}>
      <Tabs>
        <TabPanel label="Preferences" icon={Sliders}>
          <PreferencesPanel />
        </TabPanel>
        <TabPanel label="Data management" icon={HardDrive}>
          <DataManagementPanel closeModal={onModalClose} />
        </TabPanel>
        <TabPanel label="Keyboard shortcuts" icon={Keyboard}>
          {shortcutMap.map((shortcut) => (
            <Shortcut action={shortcut.action} letter={shortcut.key} key={shortcut.key} />
          ))}
        </TabPanel>
      </Tabs>
      <Version>Version {import.meta.env.VITE_FRONTEND_VERSION || "dev"}</Version>
    </Modal>
  );
};

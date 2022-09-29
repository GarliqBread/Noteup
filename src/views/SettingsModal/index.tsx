import { shortcutMap } from "@/utils/constants";

import { IconButton } from "@/components/Button";
import { Close, HardDrive, Keyboard, Sliders } from "@/components/Icons";
import { Shortcut } from "@/components/SettingsModal/Shortcut";
import { TabPanel } from "@/components/Tabs/TabPanel";
import { Tabs } from "@/components/Tabs/Tabs";

import { DataManagementPanel } from "./panels/DataManagementPanel";
import { PreferencesPanel } from "./panels/Preferences";
import { Modal, ModalHeader, Overlay, Version, Wrapper } from "./styled";

type Props = {
  closeModal: () => void;
};

export const SettingsModal = ({ closeModal }: Props) => {
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
            <PreferencesPanel />
          </TabPanel>
          <TabPanel label="Data management" icon={HardDrive}>
            <DataManagementPanel closeModal={closeModal} />
          </TabPanel>
          <TabPanel label="Keyboard shortcuts" icon={Keyboard}>
            {shortcutMap.map((shortcut) => (
              <Shortcut action={shortcut.action} letter={shortcut.key} key={shortcut.key} />
            ))}
          </TabPanel>
        </Tabs>
        <Version>Version {import.meta.env.VITE_FRONTEND_VERSION || "dev"}</Version>
      </Modal>
    </Wrapper>
  );
};

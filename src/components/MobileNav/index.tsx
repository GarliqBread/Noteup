import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { editingSelector } from "@/recoil/editor.recoil";
import { activeFolderSelector } from "@/recoil/folder.recoil";
import { sectionsSelector } from "@/recoil/sections.recoil";

import { navHeaders } from "@/utils/constants";
import { Section } from "@/utils/enums";
import { useWindowDimensions } from "@/utils/hooks/useWindowDimensions";

import { IconButton } from "@/components/Button";
import { ArrowLeft, Gear } from "@/components/Icons";

import { Nav } from "./style";

type Props = {
  openSettings: () => void;
};

export const MobileNav = ({ openSettings }: Props) => {
  const { isSmallDevice } = useWindowDimensions();
  const activeFolder = useRecoilValue(activeFolderSelector);
  const editing = useRecoilValue(editingSelector);
  const [section, setSection] = useRecoilState(sectionsSelector);

  const isMenu = useMemo(() => section === Section.MENU, [section]);
  const header = useMemo(() => {
    if (section === Section.MENU) {
      return navHeaders[section];
    }
    if (section === Section.NOTE) {
      return navHeaders[section][editing ? "editing" : "not-editing"];
    }
    if (section === Section.LIST) {
      return navHeaders[section][activeFolder];
    }
  }, [section, activeFolder, editing]);

  const handleNavigation = () => {
    if (isMenu) return;
    setSection(section === Section.NOTE ? Section.LIST : Section.MENU);
  };

  return (
    <>
      {isSmallDevice && (
        <Nav hidden={isMenu}>
          <IconButton onClick={handleNavigation}>
            <ArrowLeft size={18} />
          </IconButton>
          <span>{header}</span>
          <IconButton onClick={openSettings}>
            <Gear size={18} />
          </IconButton>
        </Nav>
      )}
    </>
  );
};

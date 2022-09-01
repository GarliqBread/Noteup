import { useRecoilState, useRecoilValue } from "recoil";

import { activeFolderSelector } from "recoil/folder.recoil";
import { sectionsSelector } from "recoil/sections.recoil";

import { Folder, Section } from "utils/enums";
import { useWindowDimensions } from "utils/hooks/useWindowDimensions";

import { IconButton } from "components/Button";
import { ArrowLeft } from "components/Icons";

import { Nav } from "./style";

export const MobileNav = () => {
  const { isSmallDevice } = useWindowDimensions();
  const activeFolder = useRecoilValue(activeFolderSelector);
  const [section, setSection] = useRecoilState(sectionsSelector);
  const isMenu = section === Section.MENU;

  const handleNavigation = () => {
    if (isMenu) return;
    setSection(
      activeFolder === Folder.SCRATCH
        ? Section.MENU
        : section === Section.NOTE
        ? Section.LIST
        : Section.MENU,
    );
  };

  return (
    <>
      {isSmallDevice && (
        <Nav hidden={isMenu}>
          <IconButton onClick={handleNavigation}>
            <ArrowLeft size={18} />
          </IconButton>
        </Nav>
      )}
    </>
  );
};

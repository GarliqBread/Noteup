import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { activeFolderSelector } from "@/recoil/folder.recoil";
import { sectionsSelector } from "@/recoil/sections.recoil";

import { Folder, Section } from "@/utils/enums";
import { useWindowDimensions } from "@/utils/hooks/useWindowDimensions";

import { Logo, Notes, Pin, Trash } from "@/components/Icons";

import { FlexColumn } from "@/styles/layout";

import { CategoryList } from "./CategoryList";
import { Header, SidebarButton, StyledSidebar } from "./style";


export const Sidebar = () => {
  const { isSmallDevice } = useWindowDimensions();
  const section = useRecoilValue(sectionsSelector);
  const [activeFolder, setActiveFolder] = useRecoilState(activeFolderSelector);
  const inView = useMemo(() => section === Section.MENU, [section]);

  const handleFolderChange = (folder: Folder) => {
    setActiveFolder(folder);
  };

  return (
    <>
      {(inView || !isSmallDevice) && (
        <StyledSidebar>
          <FlexColumn height="100%">
            <Header>
              <Logo />
              Note<mark>up</mark>
            </Header>
            <SidebarButton
              selected={activeFolder === Folder.ALL}
              onClick={() => handleFolderChange(Folder.ALL)}
            >
              <Notes size={16} /> Notes
            </SidebarButton>
            <SidebarButton
              selected={activeFolder === Folder.PINNED}
              onClick={() => handleFolderChange(Folder.PINNED)}
            >
              <Pin size={16} /> Pinned
            </SidebarButton>
            <SidebarButton
              selected={activeFolder === Folder.TRASH}
              onClick={() => handleFolderChange(Folder.TRASH)}
            >
              <Trash size={16} /> Trash
            </SidebarButton>
            <CategoryList />
          </FlexColumn>
        </StyledSidebar>
      )}
    </>
  );
};

import { useRecoilState } from "recoil";

import { activeFolderSelector } from "recoil/folder.recoil";

import { Folder } from "utils/enums";

import { Notes, Pin, PostIt, Trash } from "components/Icons";

import { CategoryList } from "./CategoryList";
import { SidebarButton, StyledSidebar } from "./style";

export const Sidebar = () => {
  const [activeFolder, setActiveFolder] = useRecoilState(activeFolderSelector);

  const handleFolderChange = (folder: Folder) => {
    setActiveFolder(folder);
  };

  return (
    <StyledSidebar>
      <SidebarButton
        selected={activeFolder === Folder.SCRATCH}
        onClick={() => handleFolderChange(Folder.SCRATCH)}
      >
        <PostIt size={16} /> Scratch paper
      </SidebarButton>
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
    </StyledSidebar>
  );
};

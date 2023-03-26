import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import { sectionsSelector } from "@/recoil/sections.recoil";

import { Section } from "@/utils/enums";
import { useWindowDimensions } from "@/utils/hooks/useWindowDimensions";

import { Plus } from "@/components/Icons";
import { SimpleForm } from "@/components/Forms/SimpleForm";
import { FlexColumn } from "@/styles/layout";

import { CategoryList } from "./ProjectList";
import { Header, SidebarButton, StyledSidebar } from "./style";

import { categoriesSelector } from "@/recoil/categories.recoil";

export const SidebarTasks = () => {
  const { isSmallDevice } = useWindowDimensions();
  const section = useRecoilValue(sectionsSelector);
  const inView = useMemo(() => section === Section.MENU, [section]);
  const [addingTempProject, setAddingTempProject] = useState(false);


  return (
    <>
      {(inView || !isSmallDevice) && (
        <StyledSidebar>
          <FlexColumn height="100%">
            <Header>
              Tasks
            </Header>
            <SidebarButton
              onClick={() => setAddingTempProject(true)}
            >
              <Plus size={16} /> New Project
            </SidebarButton>
            {
            addingTempProject && 
            <SimpleForm
              recoilStateMethod={categoriesSelector}
              closeForm={() => setAddingTempProject(false)} 
            />
          }
            <CategoryList />
          </FlexColumn>
        </StyledSidebar>
      )}
    </>
  );
};

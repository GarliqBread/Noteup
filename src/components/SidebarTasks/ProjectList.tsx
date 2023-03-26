import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { categoriesSelector, openCategoryListSelector } from "@/recoil/categories.recoil";

import { LabelText } from "@/utils/enums";

import { IconButton } from "@/components/Button";
import { Plus } from "@/components/Icons";

import { SimpleForm } from "@/components/Forms/SimpleForm";
import { ProjectContext } from "./ProjectContext";
import { ProjectOption } from "./ProjectOption";
import { CollapseListButton } from "@/components/CollapseListButton";
import { CategoryTitle, List } from "./style";

export const CategoryList = () => {
  const [renamingCategoryId, setRenamingCategoryId] = useState("");
  const [addingTempCategory, setAddingTempCategory] = useState(false);
  const categories = useRecoilValue(categoriesSelector);
  const [categoryListOpen, setCategoryListOpen] = useRecoilState(openCategoryListSelector);

  const cancelRenaming = useCallback(() => setRenamingCategoryId(""), []);

  return (
    <>
      <CategoryTitle>
        <CollapseListButton
          onClick={() => setCategoryListOpen(!categoryListOpen)}
          label="Collapse Projects List"
          labelTitle="Collapse Projects List"
          isListOpen={categoryListOpen}
          showIcon={categories.length > 0}
        />
        <IconButton title={LabelText.ADD_CATEGORY} onClick={() => setAddingTempCategory(true)}>
          <Plus size={18} />
        </IconButton>
      </CategoryTitle>
      <List>
        {categoryListOpen &&
          categories.map((category) => (
            <ProjectContext
              key={category.id}
              categoryId={category.id}
              setRenamingCategoryId={setRenamingCategoryId}
            >
              <ProjectOption
                category={category}
                renamingId={renamingCategoryId}
                cancelRenaming={cancelRenaming}
              />
            </ProjectContext>
          ))}
      </List>
      {
        addingTempCategory && 
        <SimpleForm 
          recoilStateMethod={categoriesSelector}
          closeForm={() => setAddingTempCategory(false)} 
        />
      }
    </>
  );
};

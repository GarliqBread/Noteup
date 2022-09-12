import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { categoriesSelector, openCategoryListSelector } from "@/recoil/categories.recoil";

import { LabelText } from "@/utils/enums";

import { IconButton } from "@/components/Button";
import { Plus } from "@/components/Icons";

import { AddCategoryForm } from "./AddCategoryForm";
import { CategoryContext } from "./CategoryContext";
import { CategoryOption } from "./CategoryOption";
import { CollapseCategoryListButton } from "./CollapseCategoriesButton";
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
        <CollapseCategoryListButton
          onClick={() => setCategoryListOpen(!categoryListOpen)}
          label={LabelText.COLLAPSE_CATEGORY}
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
            <CategoryContext
              key={category.id}
              categoryId={category.id}
              setRenamingCategoryId={setRenamingCategoryId}
            >
              <CategoryOption
                category={category}
                renamingId={renamingCategoryId}
                cancelRenaming={cancelRenaming}
              />
            </CategoryContext>
          ))}
      </List>
      {addingTempCategory && <AddCategoryForm closeForm={() => setAddingTempCategory(false)} />}
    </>
  );
};

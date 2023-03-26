import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { categoriesSelector, selectedCategoryIdSelector } from "@/recoil/categories.recoil";
import { activeFolderSelector } from "@/recoil/folder.recoil";
import { Category } from "@/recoil/types";

import { Folder } from "@/utils/enums";

import { Folder as FolderIcon } from "@/components/Icons";
import { Input } from "@/components/Input";

import { Ellipsis, Flex } from "@/styles/layout";

import { CategoryItem, Form } from "./style";

type Props = {
  category: Category;
  renamingId: string;
  cancelRenaming: () => void;
};

export const ProjectOption = ({ category, renamingId, cancelRenaming }: Props) => {
  const [tempName, setTempName] = useState(category.name);
  const activeFolder = useRecoilValue(activeFolderSelector);
  const [selectedCategoryId, setSelectedCategory] = useRecoilState(selectedCategoryIdSelector);
  const [categoryState, updateCategories] = useRecoilState(categoriesSelector);

  const isCategoryFolder = useMemo(() => activeFolder === Folder.CATEGORY, [activeFolder]);

  const handleCategorySelect = () => setSelectedCategory(category.id);
  const handleRename = () => {
    if (categoryState && renamingId) {
      updateCategories(
        categoryState.map((c) =>
          c.id === renamingId
            ? {
                ...c,
                name: tempName,
              }
            : c,
        ),
      );
    }
    cancelRenaming();
  };

  const renaming = useMemo(() => renamingId == category.id, [renamingId, category]);

  useEffect(() => {
    if (renaming) {
      setTimeout(() => document.getElementById("category-input")?.focus(), 100);
    }
  }, [renaming]);

  return (
    <CategoryItem
      onClick={handleCategorySelect}
      selected={isCategoryFolder && selectedCategoryId === category.id}
    >
      <Flex alignItems="center" gap={10}>
        <FolderIcon className="icon" size={15} />
        {renaming ? (
          <Form onSubmit={handleRename} onClick={(e) => e.stopPropagation()}>
            <Input
              aria-label="Category name"
              autoFocus
              value={tempName}
              onChange={setTempName}
              onBlur={handleRename}
            />
          </Form>
        ) : (
          <Ellipsis>{category.name}</Ellipsis>
        )}
      </Flex>
    </CategoryItem>
  );
};

import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { categoriesSelector } from "@/recoil/categories.recoil";

import { Input } from "@/components/Input";

import { CategoryForm } from "./style";

type Props = {
  closeForm: () => void;
};

export const AddCategoryForm = ({ closeForm }: Props) => {
  const [tempName, setTempName] = useState("");
  const [categories, setCategories] = useRecoilState(categoriesSelector);

  const resetForm = () => {
    setTempName("");
    closeForm();
  };

  const createCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategories([
      ...categories,
      {
        name: tempName,
        id: uuid(),
      },
    ]);
    resetForm();
  };

  return (
    <CategoryForm onSubmit={createCategory}>
      <Input
        aria-label="Category name"
        autoFocus
        maxLength={20}
        placeholder="New category..."
        value={tempName}
        onChange={setTempName}
        onBlur={resetForm}
      />
    </CategoryForm>
  );
};

import { useRecoilState } from "recoil";

import { categoriesSelector } from "../../recoil/categories.recoil";

import { ContextMenu } from "../ContextMenu";
import { Dropdown } from "../Dropdown";
import { Close, Edit } from "../Icons";

type Props = {
  categoryId: string;
  setRenamingCategoryId: (id: string) => void;
  children: React.ReactNode;
};

export const CategoryContext = ({ categoryId, setRenamingCategoryId, children }: Props) => {
  const [categories, setCategories] = useRecoilState(categoriesSelector);

  const menu = [
    {
      id: "rename",
      onClick: () => setRenamingCategoryId(categoryId),
      children: (
        <>
          <Edit size={15} /> Rename category
        </>
      ),
    },
    {
      id: "delete",
      onClick: () => setCategories(categories.filter((category) => category.id !== categoryId)),
      children: (
        <>
          <Close size={15} /> Delete category
        </>
      ),
      danger: true,
    },
  ];

  return (
    <ContextMenu menu={menu}>
      {children}
      <Dropdown menu={menu} />
    </ContextMenu>
  );
};

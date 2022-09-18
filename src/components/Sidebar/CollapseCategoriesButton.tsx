import { ChevronDown, ChevronRight, Stack } from "@/components/Icons";

import { Label } from "@/styles/typography";

import { CollapseButton } from "./style";

type Props = {
  onClick: () => void;
  label: string;
  isListOpen: boolean;
  showIcon: boolean;
};

export const CollapseCategoryListButton = ({ onClick, label, isListOpen, showIcon }: Props) => {
  return (
    <CollapseButton onClick={onClick} aria-label={label}>
      {showIcon ? (
        isListOpen ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronRight size={16} />
        )
      ) : (
        <Stack size={16} />
      )}
      <Label>CATEGORIES</Label>
    </CollapseButton>
  );
};

import { ChevronDown, ChevronRight, Stack } from "@/components/Icons";

import { Label } from "@/styles/typography";

import { CollapseButton } from "./style";

type Props = {
  onClick: () => void;
  label: string;
  labelTitle: string;
  isListOpen: boolean;
  showIcon: boolean;
};

export const CollapseListButton = ({ onClick, label, labelTitle, isListOpen, showIcon }: Props) => {
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
      <Label>{labelTitle}</Label>
    </CollapseButton>
  );
};

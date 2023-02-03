import { useRef } from "react";

import { Shortcuts } from "@/utils/enums";
import { useKey } from "@/utils/hooks/useKey";

import { IconButton } from "@/components/Button";
import { Close } from "@/components/Icons";

import { FlexColumn } from "@/styles/layout";
import { Label } from "@/styles/typography";

import { InputContainer, StyledInput } from "./style";

type Props = {
  testId?: string;
  value: string;
  label?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  clear?: boolean;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
};

export const Input = ({
  testId,
  value,
  label,
  type,
  placeholder,
  maxLength,
  autoFocus,
  clear,
  onChange,
  onBlur,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  useKey(Shortcuts.SEARCH, () => inputRef.current?.focus());

  return (
    <FlexColumn>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <StyledInput
          data-testid={testId}
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          maxLength={maxLength}
          onBlur={(e) => onBlur && onBlur(e.target.value)}
          onChange={(e) => onChange(e.target.value)}
        />
        {clear && value !== "" && (
          <IconButton className="clear-button" title="clear input" onClick={handleClear}>
            <Close size={18} />
          </IconButton>
        )}
      </InputContainer>
    </FlexColumn>
  );
};

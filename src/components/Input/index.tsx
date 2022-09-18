import { useRef } from "react";

import { Shortcuts } from "@/utils/enums";
import { useKey } from "@/utils/hooks/useKey";

import { IconButton } from "@/components/Button";
import { Close } from "@/components/Icons";

import { InputContainer, StyledInput } from "./style";

type Props = {
  testId?: string;
  value: string;
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
    <InputContainer>
      <StyledInput
        data-testid={testId}
        ref={inputRef}
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
  );
};

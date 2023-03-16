import { useRef } from "react";

import { useKey } from "../../utils/hooks/useKey";

import { IconButton } from "../Button";
import { Close } from "../Icons";

import { InputContainer, StyledInput } from "./style";

type Props = {
  testId?: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  clear?: boolean;
  autoFocus?: boolean;
  shortcut?: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
};

export const Input = ({
  testId,
  value,
  placeholder,
  maxLength,
  autoFocus,
  shortcut,
  clear,
  onChange,
  onBlur,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  useKey(shortcut, () => inputRef.current?.focus());

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

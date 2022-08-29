import { useRef } from "react";

import { Shortcuts } from "utils/enums";
import { useKey } from "utils/hooks";

import { IconButton } from "components/Button";
import { Close } from "components/Icons";

import { InputContainer, StyledInput } from "./style";

type Props = {
  id?: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  clear?: boolean;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
};

export const Input = ({
  id,
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
        id={id}
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

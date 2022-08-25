import { useRef } from "react";

import { Shortcuts } from "utils/enums";
import { useKey } from "utils/hooks";

import { IconButton } from "components/Button";
import { Close } from "components/Icons";

import { InputContainer, StyledInput } from "./style";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  clear?: boolean;
};

export const Input = ({ value, onChange, placeholder, clear }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  useKey(Shortcuts.SEARCH, () => inputRef.current?.focus());

  return (
    <InputContainer>
      <StyledInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
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

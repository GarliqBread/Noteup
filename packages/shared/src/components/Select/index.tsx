import { SelectContainer, StyledSelect } from "./style";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  className?: string;
  emptyText?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
};

export const Select = ({ className = "", emptyText, options, onChange, value }: Props) => {
  return (
    <SelectContainer className={className}>
      <StyledSelect
        data-testid="test-select"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {value === "" && emptyText && <option>{emptyText}</option>}
        {options.map((selectOption) => (
          <option
            data-testid={selectOption.value}
            key={selectOption.value}
            value={selectOption.value}
          >
            {selectOption.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

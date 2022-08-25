import { SelectContainer, StyledSelect } from "./style";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
};

export const Select = ({ options, onChange, value }: Props) => {
  return (
    <SelectContainer>
      <StyledSelect onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((selectOption) => (
          <option key={selectOption.value} value={selectOption.value}>
            {selectOption.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

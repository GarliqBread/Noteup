import { Select, SelectOption } from "@/components/Select";

import { SelectOptionContainer } from "./style";

type Props = {
  title: string;
  description: string;
  onChange: (value: string) => void;
  value: string;
  options: Array<SelectOption>;
};

export const SelectOptions = ({ title, description, onChange, value, options }: Props) => {
  return (
    <SelectOptionContainer>
      <div>
        <h3>{title}</h3>
        <p className="description">{description}</p>
      </div>
      <Select options={options} onChange={onChange} value={value} />
    </SelectOptionContainer>
  );
};

import { Switch } from "@/components/Switch";

import { OptionContainer } from "./style";

type Props = {
  title: string;
  description: string;
  toggle: () => void;
  checked: boolean;
};

export const Option = ({ title, description, toggle, checked }: Props) => {
  return (
    <OptionContainer>
      <div>
        <h3>{title}</h3>
        <p className="description">{description}</p>
      </div>
      <Switch toggle={toggle} checked={checked} />
    </OptionContainer>
  );
};

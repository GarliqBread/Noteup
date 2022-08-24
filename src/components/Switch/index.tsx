import { Label, Slider } from "./styled";

type Props = {
  toggle: () => void;
  checked: boolean;
};

export const Switch = ({ toggle, checked }: Props) => {
  return (
    <Label>
      <input type="checkbox" onChange={toggle} checked={checked} />
      <Slider className="slider" />
    </Label>
  );
};

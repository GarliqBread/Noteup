import { Label, Slider } from "./styled";

type Props = {
  testId?: string;
  toggle: () => void;
  checked: boolean;
};

export const Switch = ({ testId, toggle, checked }: Props) => {
  return (
    <Label>
      <input data-testid={testId} type="checkbox" onChange={toggle} checked={checked} />
      <Slider className="slider" />
    </Label>
  );
};

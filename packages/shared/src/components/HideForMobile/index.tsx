import { Wrapper } from "./style";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const HideForMobile = ({ children }: Props) => <Wrapper>{children}</Wrapper>;

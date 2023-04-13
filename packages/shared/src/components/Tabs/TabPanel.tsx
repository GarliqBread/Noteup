import { RenderedIcon } from "../Icons";

type Props = {
  label: string;
  icon: RenderedIcon;
  children: JSX.Element[] | JSX.Element;
};

export const TabPanel = ({ children }: Props) => {
  return <section>{children}</section>;
};

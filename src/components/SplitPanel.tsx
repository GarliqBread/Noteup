import Pane from "react-split-pane";

import { useWindowDimensions } from "@/utils/hooks/useWindowDimensions";

type Props = {
  split?: "vertical" | "horizontal";
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  children: JSX.Element | JSX.Element[];
};

export const SplitPane = ({ split, minSize, maxSize, defaultSize, children }: Props) => {
  const { isSmallDevice } = useWindowDimensions();

  if (isSmallDevice) {
    return <>{children}</>;
  }

  return (
    <Pane split={split} minSize={minSize} maxSize={maxSize} defaultSize={defaultSize}>
      {children}
    </Pane>
  );
};

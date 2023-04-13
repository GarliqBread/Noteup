import { Close, Portal, Root, Trigger } from "@radix-ui/react-popover";

import { PopoverContent, PopoverItem } from "./style";

type Props = {
  menu: {
    id: string;
    onClick: () => void;
    children: JSX.Element;
  }[];
  children: JSX.Element;
};

export const Popover = ({ menu, children }: Props) => (
  <Root>
    <Trigger asChild>{children}</Trigger>
    <Portal>
      <PopoverContent>
        {menu.map((item) => (
          <Close key={item.id} asChild>
            <PopoverItem onClick={item.onClick}>{item.children}</PopoverItem>
          </Close>
        ))}
      </PopoverContent>
    </Portal>
  </Root>
);

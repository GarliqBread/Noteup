import { Portal, Root, Sub, Trigger } from "@radix-ui/react-context-menu";

import { lightTheme } from "@/styles/theme/colors";

import {
  ContextContent,
  ContextItem,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextWrapper,
} from "./style";

type Props = {
  color: keyof typeof lightTheme;
  menu: {
    id: string;
    onClick?: () => void;
    children: JSX.Element;
    danger?: boolean;
    subMenu?: {
      id: string;
      onClick?: () => void;
      children: JSX.Element;
    }[];
  }[];
  children: React.ReactNode;
};

export const ContextMenu = ({ color, menu, children }: Props) => {
  return (
    <ContextWrapper color={color}>
      <Root>
        <Trigger>{children}</Trigger>
        <Portal>
          <ContextContent>
            {menu.map((item) =>
              item.subMenu ? (
                <Sub key={item.id}>
                  <ContextMenuSubTrigger>{item.children}</ContextMenuSubTrigger>
                  <Portal>
                    <ContextMenuSubContent sideOffset={2} alignOffset={-5}>
                      {item.subMenu.map((subItem) => (
                        <ContextItem key={subItem.id} onClick={subItem.onClick}>
                          {subItem.children}
                        </ContextItem>
                      ))}
                    </ContextMenuSubContent>
                  </Portal>
                </Sub>
              ) : item.onClick ? (
                <ContextItem
                  key={item.id}
                  danger={item.danger ? "true" : undefined}
                  onClick={item.onClick}
                >
                  {item.children}
                </ContextItem>
              ) : (
                item.children
              ),
            )}
          </ContextContent>
        </Portal>
      </Root>
    </ContextWrapper>
  );
};

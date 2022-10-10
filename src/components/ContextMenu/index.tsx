import { Portal, Root, Trigger } from "@radix-ui/react-context-menu";

import { lightTheme } from "@/styles/theme/colors";

import { ContextContent, ContextItem, ContextWrapper } from "./style";

type Props = {
  color: keyof typeof lightTheme;
  menu: {
    onClick?: () => void;
    children: JSX.Element;
    danger?: boolean;
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
            {menu.map((item, index) =>
              item.onClick ? (
                <ContextItem
                  key={index}
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

import { Portal, Root, Trigger } from "@radix-ui/react-context-menu";

import { ContextContent, ContextItem, ContextWrapper } from "./style";

type Props = {
  menu: {
    onClick?: () => void;
    children: JSX.Element;
    danger?: boolean;
  }[];
  children: React.ReactNode;
};

export const ContextMenu = ({ menu, children }: Props) => {
  return (
    <ContextWrapper>
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

import { Portal, Root, Sub, Trigger } from "@radix-ui/react-dropdown-menu";

import { More } from "@/components/Icons";

import { DropItem, MenuContent, MenuSubContent, MenuSubTrigger, TriggerButton } from "./style";

type Props = {
  selected: boolean;
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
};

export const Dropdown = ({ selected, menu }: Props) => {
  return (
    <Root>
      <Trigger asChild>
        <TriggerButton data-testid="trigger">
          <More stroke={selected ? "#ffffff" : undefined} className="dropdown-icon" size={18} />
        </TriggerButton>
      </Trigger>
      <MenuContent sideOffset={5}>
        {menu.map((item) =>
          item.subMenu ? (
            <Sub key={item.id}>
              <MenuSubTrigger>{item.children}</MenuSubTrigger>
              <Portal>
                <MenuSubContent sideOffset={2} alignOffset={-5}>
                  {item.subMenu.map((subItem) => (
                    <DropItem key={subItem.id} onClick={subItem.onClick}>
                      {subItem.children}
                    </DropItem>
                  ))}
                </MenuSubContent>
              </Portal>
            </Sub>
          ) : item.onClick ? (
            <DropItem
              key={item.id}
              danger={item.danger ? "true" : undefined}
              onClick={item.onClick}
            >
              {item.children}
            </DropItem>
          ) : (
            item.children
          ),
        )}
      </MenuContent>
    </Root>
  );
};

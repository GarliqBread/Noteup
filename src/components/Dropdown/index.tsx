import { Root, Trigger } from "@radix-ui/react-dropdown-menu";

import { More } from "components/Icons";

import { DropItem, MenuContent, TriggerButton } from "./style";

type Props = {
  menu: {
    onClick?: () => void;
    children: JSX.Element;
    danger?: boolean;
  }[];
};

export const Dropdown = ({ menu }: Props) => {
  return (
    <Root>
      <Trigger asChild>
        <TriggerButton>
          <More className="dropdown-icon" size={18} />
        </TriggerButton>
      </Trigger>
      <MenuContent sideOffset={5}>
        {menu.map((item, index) =>
          item.onClick ? (
            <DropItem key={index} danger={item.danger ? "true" : undefined} onClick={item.onClick}>
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

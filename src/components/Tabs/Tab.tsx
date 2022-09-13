import { RenderedIcon } from "@/components/Icons";

import { TabContainer } from "./style";

type Props = {
  label: string;
  activeTab: string;
  onClick: (label: string) => void;
  icon: RenderedIcon;
};

export const Tab = ({ activeTab, label, icon: Icon, onClick }: Props) => {
  return (
    <TabContainer
      role="button"
      key={label}
      active={activeTab === label}
      onClick={() => onClick(label)}
    >
      <Icon size={18} aria-hidden="true" /> <span>{label}</span>
    </TabContainer>
  );
};

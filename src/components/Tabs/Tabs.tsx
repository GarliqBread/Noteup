import { Fragment, useState } from "react";

import { Tab } from "./Tab";
import { TabContent, TabList, TabsContainer } from "./style";

type Props = {
  children: JSX.Element[];
};

export const Tabs = ({ children }: Props) => {
  const [activeTab, setActiveTab] = useState("Preferences");

  return (
    <TabsContainer>
      <TabList>
        {children.map((child) => (
          <Tab
            icon={child.props.icon}
            activeTab={activeTab}
            key={child.props.label}
            label={child.props.label}
            onClick={setActiveTab}
          />
        ))}
      </TabList>
      <TabContent>
        {children.map((child) => {
          if (child.props.label !== activeTab) return;

          return (
            <Fragment key={child.props.label}>
              <h3>{child.props.label}</h3>
              {child.props.children}
            </Fragment>
          );
        })}
      </TabContent>
    </TabsContainer>
  );
};

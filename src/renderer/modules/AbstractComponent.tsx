import * as React from "react";

export const ContextTabs = React.createContext<ITabsManaged>({
  selectedTab: -1,
  setSelectedTab: () => {}
});

export interface ITabsManaged {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
}

export interface IAbstractComponent {
  id: number;
  order: number;
  iconName: string;
  title: string;
  showing: boolean;
  available: boolean;
}

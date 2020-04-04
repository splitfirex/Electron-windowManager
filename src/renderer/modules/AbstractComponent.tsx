import * as React from "react";

export const ContextTabs = React.createContext<ITabsManaged>({
  selectedTab: -1,
  setSelectedTab: () => {}
});

export interface ITabsManaged {
  selectedTab: number;
  setSelectedTab: (value: number) => void;
}

export interface IAbstractComponentProp {
  component: string,
  id: number;
  order: number;
  iconName: string;
  title: string;
  subTitle: string;
  showing: boolean;
  available: boolean;
}


export class AbstractComponent extends React.PureComponent<IAbstractComponentProp,{}>{

  constructor(props: IAbstractComponentProp){
    super(props);
  }

}
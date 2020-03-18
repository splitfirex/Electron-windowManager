import * as React from "react";
import { IAbstractComponent, ContextTabs } from "../AbstractComponent";
import * as Electron from "electron";
import { BasicMessage } from "@/main/core/comm/MessageManager";

export const EstacionComponent: React.FunctionComponent<IAbstractComponent> & {
  defaultProps: Partial<IAbstractComponent>;
} = props => {
  const { selectedTab } = React.useContext(ContextTabs);

  return (
    <div
      key={props.id}
      style={{ display: selectedTab === props.id ? "Block" : "none" }}
    >
      EstacionComponent {props.id}
    </div>
  );
};

EstacionComponent.defaultProps = {
  id: 2,
  order: 0,
  iconName: "Train",
  subTitle: "Visualizador de estacion",
  title: "Estación",
  showing: false,
  available: true
};

import * as React from "react";
import { IAbstractComponent, ContextTabs } from "../AbstractComponent";
import * as Electron from "electron";
import { BasicMessage } from "@/main/core/comm/MessageManager";

export const VideograficoComponent: React.FunctionComponent<
  IAbstractComponent
> & { defaultProps: Partial<IAbstractComponent> } = props => {
  const { selectedTab } = React.useContext(ContextTabs);

  return (
    <div
      key={props.id}
      style={{ display: selectedTab === props.id ? "Block" : "none" }}
    >
      VideograficoComponent {props.id}
    </div>
  );
};

VideograficoComponent.defaultProps = {
  id: 0,
  order: 0,
  iconName: "Nav2DMapView",
  title: "Videografico",
  showing: false,
  available: true
}
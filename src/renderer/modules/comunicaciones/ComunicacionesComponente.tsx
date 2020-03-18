import * as React from "react";
import { IAbstractComponent, ContextTabs } from "../AbstractComponent";
import * as Electron from "electron";
import { BasicMessage } from "@/main/core/comm/MessageManager";

export const ComunicacionesComponent: React.FunctionComponent<
  IAbstractComponent
> & { defaultProps: Partial<IAbstractComponent> } = props => {
  const { selectedTab } = React.useContext(ContextTabs);
  return (
    <div
      key={props.id}
      style={{ display: selectedTab === props.id ? "Block" : "none" }}
    >
      ComunicacionesComponent {props.id}
    </div>
  );
};

ComunicacionesComponent.defaultProps = {
  id: 1,
  order: 0,
  iconName: "Phone",
  title: "Comunicaciones",
  showing: false,
  available: true
};

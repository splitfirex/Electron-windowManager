import * as React from "react";
import { IAbstractComponentProp, ContextTabs } from "../AbstractComponent";
import * as Electron from "electron";
import { BasicMessage } from "@/main/core/comm/MessageManager";
import { IComponentDefinition } from "@/main/core/window/IWindowState";

export const EstacionComponent: React.FunctionComponent<IComponentDefinition> = props => {
  const { selectedTab } = React.useContext(ContextTabs);

  return (
    <div key={props.id} style={{ display: selectedTab === props.id ? "Block" : "none" }}>
      EstacionComponent {props.id}
    </div>
  );
};

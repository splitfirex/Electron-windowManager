import * as React from "react";
import { IAbstractComponent, ContextTabs } from "../AbstractComponent";
import * as Electron from "electron";
import { BasicMessage } from "@/main/core/comm/MessageManager";
import { usePrevious } from "@/renderer/layout/utils/UsePrevious";
import { mainEvent } from "./VideograficoAction";

export const VideograficoComponent: React.FunctionComponent<IAbstractComponent> & {
  defaultProps: Partial<IAbstractComponent>;
} = props => {
  const { selectedTab } = React.useContext(ContextTabs);
  const [valor, setValor] = React.useState<number[]>([0]);

  const processTick = (sender: any,data : BasicMessage)=>{
    let newValor = [...valor];
    newValor.push(data.payload);
    setValor(newValor);
  }

  const processInit = (sender: any,data : BasicMessage)=>{
    setValor(data.payload);
  }

  React.useEffect(() => {
    console.log("INIT");
    let newValor = Electron.ipcRenderer.sendSync("/videografico/init", {});
    setValor(newValor);
  }, []);

  React.useEffect(() => {
    Electron.ipcRenderer.on("/videografico",processTick);

    return () => {
      Electron.ipcRenderer.removeListener("/videografico", processTick);
    };
  }, [valor]);

  return (
    <div
      key={props.id}
      style={{ display: selectedTab === props.id ? "Block" : "none" }}
    >
      VideograficoComponent {props.id}{" "}
      {valor.map(x => (
        <div key={x}>{x}</div>
      ))}
    </div>
  );
};

VideograficoComponent.defaultProps = {
  id: 0,
  order: 0,
  iconName: "Nav2DMapView",
  title: "Videografico",
  subTitle: "Visualizador del entorno virtual",
  showing: false,
  available: true
};

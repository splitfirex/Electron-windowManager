import * as React from "react";
import { IAbstractComponentProp, ContextTabs } from "../AbstractComponent";
import * as Electron from "electron";
import { BasicMessage } from "@/main/core/comm/MessageManager";
import { usePrevious } from "@/renderer/layout/utils/UsePrevious";
import { getSVGString } from "./VideograficoAction";
import { wrap } from "comlink";
import { ipcRenderer } from "electron";
import { mainProcObjectEndpoint } from "comlink-electron-adapter";
// @ts-ignore
import SVG from "react-inlinesvg";
import {
  IContextualMenuItem,
  ContextualMenuItemType,
  ContextualMenu,
} from "office-ui-fabric-react";
import { IComponentDefinition } from "@/main/core/window/IWindowState";

export const VideograficoComponent: React.FunctionComponent<IComponentDefinition> = (
  props
) => {
  const linkRef = React.useRef<HTMLElement>(null);
  const [svgCode, setSvgCode] = React.useState(`
  <svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect id="pepe" x="10" y="10" height="100" width="100"
      style="stroke:#ff0000; fill: #0000ff"/>
  </svg>
  `);
  const { selectedTab } = React.useContext(ContextTabs);
  const [valor, setValor] = React.useState<number[]>([0]);
  const [currentMouseEvent, setCurrentMouseEvent] = React.useState<
    MouseEvent
  >();

  const processTick = (sender: any, data: BasicMessage) => {
    let newValor = [...valor];

    newValor.push(data.payload);
    setValor(newValor);
  };

  const processInit = (sender: any, data: BasicMessage) => {
    setValor(data.payload);
  };

  React.useEffect(() => {
    console.log("INIT");
    getSVGString(false, "EST01A.svg").then((stringsvg) => {
      console.log(stringsvg);
      setSvgCode(stringsvg);
    });
  }, []);

  React.useEffect(() => {
    Electron.ipcRenderer.on("/videografico", processTick);

    linkRef.current?.childNodes.forEach((x: HTMLElement) => {
      x.onmousedown = (event: MouseEvent) =>
        event.which == 3 ? onShowContextualMenu(x, event, true) : undefined;
    });

    return () => {
      Electron.ipcRenderer.removeListener("/videografico", processTick);
      linkRef.current?.childNodes.forEach((x: HTMLElement) => {
        x.onmousedown = null;
      });
    };
  }, [valor]);

  const [showContextualMenu, setShowContextualMenu] = React.useState(false);
  const onShowContextualMenu = (
    element: any,
    event: MouseEvent,
    b: boolean
  ) => {
    setCurrentMouseEvent(event);
    setShowContextualMenu(b);
  };
  const onHideContextualMenu = () => {
    setShowContextualMenu(false);
  };

  const menuItems: IContextualMenuItem[] = [
    {
      key: "newItem",
      text: "New",
      onClick: () => {
        linkRef.current?.childNodes.forEach((x: SVGRectElement) => {
          x.setAttribute("style", "fill:#ff0000");
        });
      },
    },
  ];

  return (
    <div
      key={props.id}
      style={{
        display: selectedTab === props.id ? "Block" : "none",
        height: "100%",
      }}
    >
      <div className="videograficoSVG">
        <SVG
          innerRef={linkRef}
          src={"data:image/svg+xml;base64," + btoa(svgCode)}
        />
      </div>
      {valor.slice(valor.length - 50, valor.length).map((x) => (
        <div>{x}</div>
      ))}

      <ContextualMenu
        target={currentMouseEvent}
        items={menuItems}
        hidden={!showContextualMenu}
        onItemClick={onHideContextualMenu}
        onDismiss={onHideContextualMenu}
      />
    </div>
  );
};

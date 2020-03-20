import * as React from "react";
import { IAbstractComponent, ContextTabs } from "../AbstractComponent";
import * as Electron from "electron";
import { BasicMessage } from "@/main/core/comm/MessageManager";
import { usePrevious } from "@/renderer/layout/utils/UsePrevious";
import { mainEvent } from "./VideograficoAction";
// @ts-ignore
import SVG from "react-inlinesvg";
import {
  IContextualMenuItem,
  ContextualMenuItemType,
  ContextualMenu
} from "office-ui-fabric-react";

export const VideograficoComponent: React.FunctionComponent<
  IAbstractComponent
> & {
  defaultProps: Partial<IAbstractComponent>;
} = props => {
  const linkRef = React.useRef(null);
  
  const svgCode = `
  <svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect x="10" y="10" height="100" width="100"
      style="stroke:#ff0000; fill: #0000ff"/>
  </svg>
  `;
  const loadedSVG = (
    <SVG
      innerRef={linkRef}
      src={"data:image/svg+xml;base64," + btoa(svgCode)}
    />
  );
  const { selectedTab } = React.useContext(ContextTabs);
  const [valor, setValor] = React.useState<number[]>([0]);
  const [currentMouseEvent,setCurrentMouseEvent] =React.useState<MouseEvent>();
  
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

    let newValor = Electron.ipcRenderer.sendSync("/videografico/init", {});
    setValor(newValor);
  }, []);

  React.useEffect(() => {
    Electron.ipcRenderer.on("/videografico", processTick);

    if (linkRef.current) {
      // @ts-ignore
      linkRef.current.childNodes.forEach(x => {
        x.onclick = (event :MouseEvent) => onShowContextualMenu(x,event,true);
      });
    }

    return () => {
      Electron.ipcRenderer.removeListener("/videografico", processTick);
      // @ts-ignore
      if (linkRef.current)
        // @ts-ignore
        linkRef.current.childNodes.forEach(x => {
          x.onclick = null;
        });
    };
  }, [valor]);

  const [showContextualMenu, setShowContextualMenu] = React.useState(false);
  const onShowContextualMenu = (element : any,event : MouseEvent, b: boolean) => {
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
      onClick: () => console.log("New clicked")
    },
    {
      key: "divider_1",
      itemType: ContextualMenuItemType.Divider
    },
    {
      key: "rename",
      text: "Rename",
      onClick: () => console.log("Rename clicked")
    },
    {
      key: "edit",
      text: "Edit",
      onClick: () => console.log("Edit clicked")
    },
    {
      key: "properties",
      text: "Properties",
      onClick: () => console.log("Properties clicked")
    },
    {
      key: "linkNoTarget",
      text: "Link same window",
      href: "http://bing.com"
    },
    {
      key: "linkWithTarget",
      text: "Link new window",
      href: "http://bing.com",
      target: "_blank"
    },
    {
      key: "linkWithOnClick",
      name: "Link click",
      href: "http://bing.com",
      onClick: (
        ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
      ) => {
        alert("Link clicked");
        ev.preventDefault();
      },
      target: "_blank"
    },
    {
      key: "disabled",
      text: "Disabled item",
      disabled: true,
      onClick: () => console.error("Disabled item should not be clickable.")
    }
  ];

  return (
    <div
      key={props.id}
      style={{
        display: selectedTab === props.id ? "Block" : "none",
        height: "100%"
      }}
    >
      <div className="videograficoSVG">{loadedSVG}</div>

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

VideograficoComponent.defaultProps = {
  id: 0,
  order: 0,
  iconName: "Nav2DMapView",
  title: "Videografico",
  subTitle: "Visualizador del entorno virtual",
  showing: false,
  available: true
};

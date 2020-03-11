import * as React from "react";
import * as Electron from "electron";
import {
  Pivot,
  PivotLinkSize,
  PivotItem,
  Label,
  PivotLinkFormat,
  DefaultButton,
  IconButton,
  IStyleSet,
  IPivotStyles,
  FontSizes
} from "office-ui-fabric-react";

const pivotStyles: Partial<IStyleSet<IPivotStyles>> = {
  link: {
    height: "30px",  
    lineHeight:"30px"
  },
  linkIsSelected:{
    height: "30px"
  }
};

export const TabManager: React.FunctionComponent = () => {

  Electron.ipcRenderer.on("wee", (data: any) => {
    console.log(data);
  });



  return (
    <div>
      <Pivot
        className="pivot-menu"
        linkFormat={PivotLinkFormat.tabs}
        styles={pivotStyles}
      >
        <PivotItem headerText="My Files"></PivotItem>
        <PivotItem headerText="Recent"></PivotItem>
        <PivotItem headerText="Shared with me"></PivotItem>
      </Pivot>
      <div style={{ float: "left" }}>
        <IconButton
          className="pivot-menu-button"
          iconProps={{
            className: "pivot-menu-button-image",
            iconName: "MiniExpand"
          }}
        />
        <IconButton
          className="pivot-menu-button"
          iconProps={{
            className: "pivot-menu-button-image",
            iconName: "OpenInNewTab"
          }}
        />
        <IconButton
          className="pivot-menu-button"
          iconProps={{
            className: "pivot-menu-button-image",
            iconName: "ChromeClose"
          }}
        />
      </div>
    </div>
  );
};

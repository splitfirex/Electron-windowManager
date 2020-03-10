import { render } from "react-dom";
import * as React from "react";
import * as Electron from "electron";
import { useConstCallback } from "@uifabric/react-hooks";
import {
  IconButton,
  IIconProps,
  IContextualMenuProps,
  Stack,
  Link,
  Modal,
  Label,
  Spinner,
  SpinnerSize
} from "office-ui-fabric-react";
import { state } from "../../main/core/AppState";

enum windowState {
  RESTORED,
  MAXIMIZED
}

export interface WindowProps {
  children?: React.ReactNode;
  title: String;
}

export const StandardWindow: React.FunctionComponent<WindowProps> = props => {
  const [status, setStatus] = React.useState(windowState.RESTORED);
  const [showId, setShowId] = React.useState(false);
  const [showLoading, setLoading] = React.useState(false);

  const maximize = () => {
    if (windowState.MAXIMIZED != status) {
      Electron.remote.getCurrentWindow().maximize();
      setStatus(windowState.MAXIMIZED);
    } else {
      Electron.remote.getCurrentWindow().restore();
      setStatus(windowState.RESTORED);
    }
  };

  const minimize = () => {
    Electron.remote.getCurrentWindow().minimize();
  };

  const close = () => {
    Electron.remote.getCurrentWindow().close();
  };

  Electron.ipcRenderer.on("show-id", (event: any, message: any) => {
    setShowId(true);
    setTimeout(() => setShowId(false), 2000);
  });

  Electron.remote.getCurrentWindow().on("maximize", () => {
    setStatus(windowState.MAXIMIZED);
  });
  Electron.remote.getCurrentWindow().on("unmaximize", () => {
    setStatus(windowState.RESTORED);
  });

  return (
    <div className="window">
      <div className="window-header">
        <div className="window-icon"> </div>
        <div className="window-title">{props.title}</div>
        <div style={{ float: "right" }}>
          <IconButton
            className="window-header-button"
            iconProps={{
              iconName: "ChromeMinimize",
              className: "window-header-button-image"
            }}
            onClick={minimize}
          />
          <IconButton
            className="window-header-button"
            iconProps={{
              className: "window-header-button-image",
              iconName:
                windowState.MAXIMIZED == status ? "ChromeRestore" : "Stop"
            }}
            onClick={maximize}
          />

          <IconButton
            className="window-header-button-close"
            iconProps={{
              className: "window-header-button-image",
              iconName: "ChromeClose"
            }}
            onClick={close}
          />
        </div>
        <div style={{ clear: "both" }}></div>
      </div>
      <div className="window-content">{props.children}</div>
      <div className="window-footer"></div>
      <IdModal
        show={showId}
        windowId={Electron.remote.getCurrentWindow().id}
      ></IdModal>
      <LoadingModal show={showLoading}></LoadingModal>
    </div>
  );
};

const IdModal: React.FunctionComponent<{
  show: boolean;
  windowId: number;
}> = ({ show, windowId }): JSX.Element => {
  return (
    <Modal isOpen={show} isBlocking={false} containerClassName="show-id-dialog">
      <div style={{ textAlign: "center", fontSize: "68px" }}>{windowId}</div>
    </Modal>
  );
};

const LoadingModal: React.FunctionComponent<{
  show: boolean;
}> = ({ show }): JSX.Element => {
  return (
    <Modal isOpen={show} isBlocking={false} containerClassName="loading-dialog">
      <div style={{ textAlign: "center", fontSize: "68px" }}>
        <Spinner size={SpinnerSize.large} label="CARGANDO..." />
      </div>
    </Modal>
  );
};

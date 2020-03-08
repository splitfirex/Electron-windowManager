import * as React from "react";
import * as Electron from "electron";
import { showId } from "./LoginActions";

export const LoginComponent: React.FunctionComponent = () => {
  Electron.ipcRenderer.on("wee", (data: any) => {
    console.log(data);
  });

  return (
    <div>
      <button onClick={showId}>BOTON</button>
    </div>
  );
};

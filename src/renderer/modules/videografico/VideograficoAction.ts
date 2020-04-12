import * as Electron from "electron";
import { wrap } from "comlink";
import { mainProcObjectEndpoint } from "comlink-electron-adapter";
import { IWindowManager } from "@/main/core/window/WindowManager";
import { IComponentDefinition } from "@/main/core/window/IWindowState";
import { IWSManager } from "@/main/core/comm/WS/WSCommunicationManager";
import { Imanagers } from "@/main/core/AppState";

export const getSVGString = (cp: boolean, fichero: string) : Promise<string>  => {
  let proxied: Imanagers = <Imanagers>(
    (<unknown>wrap(mainProcObjectEndpoint(Electron.ipcRenderer)))
  );
  return Promise.resolve(proxied.wsManager.getSvgMundo(cp,fichero));
};

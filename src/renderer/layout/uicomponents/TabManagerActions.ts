import * as Electron from "electron";
import { wrap } from "comlink";
import { mainProcObjectEndpoint } from "comlink-electron-adapter";
import { IWindowManager } from "@/main/core/window/WindowManager";
import { IComponentDefinition } from "@/main/core/window/IWindowState";
import { Imanagers } from "@/main/core/AppState";

export const getAvailableComponents = (windowId: number) : Promise<IComponentDefinition[]>  => {
  let proxied: Imanagers = <Imanagers>(
    (<unknown>wrap(mainProcObjectEndpoint(Electron.ipcRenderer)))
  );
  return Promise.resolve(proxied.windowManager.getAvailableComponents(windowId));
};

export const assingComponentWindow = (listComponents: IComponentDefinition[]) : Promise<IComponentDefinition[]> => {
  let proxied: Imanagers = <Imanagers>(
    (<unknown>wrap(mainProcObjectEndpoint(Electron.ipcRenderer)))
  );

  return Promise.resolve(
    proxied.windowManager.assingComponentWindow(
      listComponents,
      Electron.remote.getCurrentWindow().id
    )
  );
};

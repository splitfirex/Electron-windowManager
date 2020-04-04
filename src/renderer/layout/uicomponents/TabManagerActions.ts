import * as Electron from "electron";
import { wrap } from "comlink";
import { mainProcObjectEndpoint } from "comlink-electron-adapter";
import { IWindowManager } from "@/main/core/window/WindowManager";
import { IComponentDefinition } from "@/main/core/window/IWindowState";

export const getAvailableComponents = (windowId: number) : Promise<IComponentDefinition[]>  => {
  let proxied: IWindowManager = <IWindowManager>(
    (<unknown>wrap(mainProcObjectEndpoint(Electron.ipcRenderer)))
  );
  return Promise.resolve(proxied.getAvailableComponents(windowId));
};

export const assingComponentWindow = (listComponents: IComponentDefinition[]) : Promise<IComponentDefinition[]> => {
  let proxied: IWindowManager = <IWindowManager>(
    (<unknown>wrap(mainProcObjectEndpoint(Electron.ipcRenderer)))
  );

  return Promise.resolve(
    proxied.assingComponentWindow(
      listComponents,
      Electron.remote.getCurrentWindow().id
    )
  );
};

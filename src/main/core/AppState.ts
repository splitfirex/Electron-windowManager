import * as Electron from "electron";
import { MM, MessageType, BasicMessage } from "./comm/MessageManager";
import { Observable } from "rxjs";
import { WindowManager } from "./window/WindowManager";
import { expose } from "comlink";
import { mainProcObjectEndpoint } from "comlink-electron-adapter";
import { WSManager, IWSManager } from "./comm/WS/WSCommunicationManager";

const windowManager = new WindowManager();
const wsManager = new WSManager();

export interface Imanagers {
  windowManager: WindowManager;
  wsManager: WSManager;
}

const managers: Imanagers = {
  windowManager,
  wsManager,
};

expose(managers, mainProcObjectEndpoint(Electron.ipcMain));

export const appState = {
  videografico: Array.from(Array(40000), () => 0),
  comunicaciones: Array.from(Array(100000), () => 0),
  estacion: Array.from(Array(200000), () => 0),
};

export const init = () => {
  Electron.ipcMain.on(
    "/videografico/init",
    (sender: any, message: BasicMessage) => {
      sender.returnValue = appState.videografico;
    }
  );

  setInterval(() => {
    MM.sendTo({
      event: MessageType.SYNC,
      action: "/videografico",
      payload: appState.videografico.length,
    });
    appState.videografico.push(appState.videografico.length);
  }, 1000);
  setInterval(() => {
    MM.sendTo({
      event: MessageType.SYNC,
      action: "/comunicaciones",
      payload: appState.comunicaciones.length,
    });
    appState.comunicaciones.push(appState.comunicaciones.length);
  }, 1500);
  setInterval(() => {
    MM.sendTo({
      event: MessageType.SYNC,
      action: "/estacion",
      payload: appState.estacion.length,
    });
    appState.estacion.push(appState.estacion.length);
  }, 1500);
};

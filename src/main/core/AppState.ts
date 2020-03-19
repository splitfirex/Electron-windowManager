import * as Electron from "electron";
import { MM, MessageType, BasicMessage } from "./comm/MessageManager";
import { Observable } from "rxjs";

export const appState = {
  videografico: [0],
  comunicaciones: [0],
  estacion: [0]
};

export const init = () => {
  Electron.ipcMain.on(
    "/videografico/init",
    (sender: any, message: BasicMessage) => {
      sender.returnValue = appState.videografico
    }
  );

  setInterval(() => {
    MM.sendTo({
      event: MessageType.SYNC,
      action: "/videografico",
      payload: appState.videografico.length
    });
    appState.videografico.push(appState.videografico.length);
  }, 1000);
  setInterval(() => {
    MM.sendTo({
      event: MessageType.SYNC,
      action: "/comunicaciones",
      payload: appState.comunicaciones.length
    });
    appState.comunicaciones.push(appState.comunicaciones.length);
  }, 1500);
  setInterval(() => {
    MM.sendTo({
      event: MessageType.SYNC,
      action: "/estacion",
      payload: appState.estacion.length
    });
    appState.estacion.push(appState.estacion.length);
  }, 1500);
};

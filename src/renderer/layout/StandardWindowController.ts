import * as Electron from "electron";
import { MM, MessageType } from "../../main/core/comm/MessageManager";


export const minimize = () => {
  Electron.remote.getCurrentWindow().minimize();
};

export const closeWindow = () => {
  Electron.remote.getCurrentWindow().close();
};

export const openWindow = (): void => {
  MM.sendFrom({ event: MessageType.NEW_WINDOW });
};

export const notifyWindowOpen = () => {
  console.log("Se inicia ventana nueva");
  MM.sendFrom({
    event: MessageType.NEW_WINDOW_OPENED,
    payload: { windowId: Electron.remote.getCurrentWindow().id }
  });
};
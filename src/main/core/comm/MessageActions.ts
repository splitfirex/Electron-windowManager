import { BasicMessage, MessageType, EventType } from "./Message";
import { state, IWindow, createNewWindow } from "../AppState";
import * as Rxjs from "rxjs";
import * as Electron from "electron";
import * as path from "path";
import { MS } from "./MessageManager";

export const initWindowData = () => {};

export const sync = (message: BasicMessage) => {
  console.log("SYNC");

  if (message.idReceiver) {
    state.windows[message.idReceiver].wm.webContents.send(
      message.payload.action || "sync",
      message
    );
  } else {
    state.windows.forEach(item => {
      item.wm.webContents.send(message.payload.action || "sync", message);
    });
  }
};

export const OpenWindow = (windowId: number, customUrl: string): IWindow => {
  if (state.windows[windowId] == undefined) {
    var window = new Electron.BrowserWindow({
      height: 768,
      width: 1024,
      minHeight: 768,
      minWidth: 1024,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        devTools: process.env.NODE_ENV === "production" ? false : true
      }
    });

    window.once("ready-to-show", () => {
      window.show();
    });

    window.once("show", () => {
      MS.send({
        action: EventType.INIT_TAB,
        idReceiver: window.id,
        payload: state.windows[window.id]
      });
    });

    window.loadURL(
      `file://${path.join(__dirname, "./index.html#" + customUrl)}`
    );

    window.on("close", () => {
      delete state.windows[window.id];
    });

    window.on;

    state.windows[window.id] = createNewWindow(window.id, window);
    return state.windows[window.id];
  } else {
    state.windows[windowId].wm.show();
    return state.windows[windowId];
  }
};

MS.receive.subscribe(message => {
  switch (message.event) {
    case MessageType.OPEN_WINDOW:
      OpenWindow(message.payload.windowId, message.payload.customUrl);
    default:
      sync(message);
  }
});

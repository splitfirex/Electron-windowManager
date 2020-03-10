import { BasicMessage, MessageType } from "./Message";
import { state } from "../AppState";
import * as Rxjs from "rxjs"
import * as Electron from "electron";
import * as path from "path";

export function processMessage(message: BasicMessage) {
  switch (message.event) {
    case MessageType.OPEN_WINDOW:
      openwindow(message.payload.windowId, message.payload.customUrl);
      break;
    default:
    case MessageType.SYNC:
      sync(message);
  }
}

export const sync = (message: BasicMessage) => {
  console.log("SYNC");
  Object.keys(state.windows).forEach(i => {
    state.windows[i].webContents.send(
      message.payload.action || "sync",
      message
    );
  });
};

export const openwindow = (
  windowId: string,
  customUrl: string
): Electron.BrowserWindow => {
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

    window.loadURL(
      `file://${path.join(__dirname, "./index.html#" + customUrl)}`
    );

    window.on("close", () => {
      delete state.windows[windowId];
    });

    state.windows[windowId] = window;
  } else {
    state.windows[windowId].show();
    return state.windows[windowId];
  }
  return window;
};

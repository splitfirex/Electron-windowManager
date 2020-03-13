import * as path from "path";
import * as Electron from "electron";
import { MessageType, MM } from "../comm/MessageManager";
import { IWindow, IWindowState } from "./IWindowState";

MM.sender.subscribe(message => {
  switch (message.event) {
    case MessageType.NEW_WINDOW:
      OpenWindow();
      break;
    case MessageType.NEW_WINDOW_OPENED:
      SubscribeWindow(message.payload.windowId);
      break;
  }
});

export const WS: IWindowState = {
  windows: new Map()
};

export const OpenWindow = (customUrl?: string): void => {
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

  if (customUrl === undefined) {
    window.loadURL(`file://${path.join(__dirname, "./index.html")}`);
  } else {
    window.loadURL(
      `file://${path.join(__dirname, "./index.html#" + customUrl)}`
    );
  }

  window.once("close", function(event: any) {
    console.log(event.sender.id);

    let valor: IWindow | undefined = WS.windows.get(event.sender.id);
    if (valor !== undefined) valor.subscription.unsubscribe();

    WS.windows.delete(event.sender.id);
  });
};

const SubscribeWindow = (windowId: number) => {
  let browser = Electron.BrowserWindow.getAllWindows().find(
    x => x.id === windowId
  );
  if (browser !== undefined)
    WS.windows.set(windowId, createNewWindow(windowId, browser));
};

const createNewWindow = (
  uuid: number,
  browser: Electron.BrowserWindow
): IWindow => {
  const result: IWindow = {
    uuid: uuid,
    browser: browser,
    subscription: MM.updater.subscribe(message => {
      //TODO ver que meto aqui
    })
  };
  return result;
};

import * as path from "path";
import * as Electron from "electron";
import { MessageType, MM } from "../comm/MessageManager";
import { IWindow, IWindowState, IComponentDefinition } from "./IWindowState";
import { expose } from "comlink";
import { mainProcObjectEndpoint } from "comlink-electron-adapter";
import components from "./ComponentsCatalog";

export interface IWindowManager {
  getAvailableComponents(windowid: number): IComponentDefinition[];
  assingComponentWindow(
    component: IComponentDefinition[],
    windowId: number
  ): IComponentDefinition[];
}

export class WindowManager implements IWindowManager {
  public getAvailableComponents(windowid: number) {
    return components;
  }

  public assingComponentWindow(
    componentsLists: IComponentDefinition[],
    windowId: number
  ) {
    components
      .filter(x => x.state.currentWindow === windowId)
      .forEach(x => {
        (x.state.available = true),
          (x.state.showing = false),
          (x.state.currentWindow = undefined);
      });

    let componentsId = componentsLists.map(x => x.id);
    components
      .filter(x => componentsId.includes(x.id))
      .forEach(x => {
        (x.state.available = false),
          (x.state.showing = true),
          (x.state.currentWindow = windowId);
      });

    return components;
  }

  WS: IWindowState = {
    windows: new Map()
  };

  public OpenWindow = (customUrl?: string): void => {
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
}

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
      browser.webContents.send(message.action || "sync", message);
    })
  };
  return result;
};

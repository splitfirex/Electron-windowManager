/**
 * Entry point of the Election app.
 */
import * as Electron from "electron";
import * as path from "path";
import * as url from "url";
import * as MessageActions from "./core/comm/messageActions";
import * as RCMCommunicationsManager from "../main/core/comm/RCM/RCMCommunicationManager";
import { OpenWindow } from "@main/core/window/WindowManager";
import { BasicMessage, MM } from "@main/core/comm/MessageManager";

let mainWindow: Electron.BrowserWindow | null;

function createWindow(): void {

  Electron.ipcMain.on("sync-message", (event: any, payload: BasicMessage) => {
    console.log("Recibi mensaje");
    console.log(payload);
    MM.sender.next(payload);
  });

  console.log("PRUEBA");
  OpenWindow();

  
  
  // Create the browser window.
  /* mainWindow = new Electron.BrowserWindow({
    height: 768,
    width: 1024,
    minHeight: 768,
    minWidth: 1024,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      devTools: process.env.NODE_ENV === "production" ? false : true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });*/
 //  OpenWindow(0,"")
  /*MS.send({
    event: MessageType.OPEN_WINDOW,
    payload: {
      windowId: "1",
      customUrl: ""
    }
  });*/

  //RCMCommunicationsManager.init();

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
Electron.app.on("ready", createWindow);

// Quit when all windows are closed.
Electron.app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    Electron.app.quit();
  }
});

Electron.app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});






// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

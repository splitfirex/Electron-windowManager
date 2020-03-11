import { MessageType, BasicMessage } from "./Message";
import * as Electron from "electron";
import { Subject } from "rxjs";

export class MS {
  static send = (
    payload: any,
    event?: MessageType,
    action?: string,
    idSender?: number,
    idReceiver?: number
  ) => {
    let BasicM: BasicMessage = {
      event: event,
      action: action,
      idSender: 0,//idSender || Electron.remote.getCurrentWindow().id,
      idReceiver: idReceiver || 0,
      payload: payload,
      resend: true
    };
  
  //  if(Electron.ipcMain) Electron.ipcMain.emit("sync-message", BasicM);
    if(Electron.ipcRenderer)Electron.ipcRenderer.send("sync-message", BasicM);
  };

  static receive = new Subject<BasicMessage>();
}

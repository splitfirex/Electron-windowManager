import * as Electron from "electron";
import { Subject } from "rxjs";

export class MM {
  static send = ({
    payload,
    event,
    action,
    idSender,
    idReceiver
  }: {
    payload?: any;
    event?: MessageType;
    action?: string;
    idSender?: number;
    idReceiver?: number;
  }) => {
    let BasicM: BasicMessage = {
      event: event || MessageType.SYNC,
      action: action,
      idSender: idSender || Electron.remote.getCurrentWindow().id,
      idReceiver: idReceiver || 0,
      payload: payload,
      resend: true
    };

    //  if(Electron.ipcMain) Electron.ipcMain.emit("sync-message", BasicM);
    console.log(BasicM);
    console.log(Electron.ipcRenderer);
    if (Electron.ipcRenderer) Electron.ipcRenderer.send("sync-message", BasicM);
  };

  static sender = new Subject<BasicMessage>();
  static updater = new Subject<BasicMessage>();
}

export interface BasicMessage {
  event?: MessageType;
  action?: string;
  idSender?: number;
  idReceiver?: number | undefined;
  resend?: boolean;
  payload: any | undefined;
}

export enum MessageType {
  _UNUSED_,
  NEW_WINDOW,
  NEW_WINDOW_OPENED,
  SYNC
}

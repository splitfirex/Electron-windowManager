import * as Electron from "electron";
import { Subject, Observable, BehaviorSubject } from "rxjs";

export class MM {
  static sendFrom = ({
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

    if (Electron.ipcRenderer) Electron.ipcRenderer.send("async-message", BasicM);
  };

  static sendTo = ({
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
      idSender: -1,
      idReceiver: idReceiver || 0,
      payload: payload,
      resend: true
    };

    try {
      MM.updater.next(BasicM);
    } catch (err) {
      console.error(err);
    }
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

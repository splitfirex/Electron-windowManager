import { MessageType, BasicMessage } from "./Message";
import * as Electron from "electron";

export class MS {
  static send = (payload: any, event?: MessageType) => {
    let BasicM: BasicMessage = {
      event: event,
      idSender: Electron.remote.getCurrentWindow().id,
      idReceiver: 0,
      payload: payload,
      resend: true
    };

    Electron.ipcRenderer.send("sync-message", BasicM);
  };
}

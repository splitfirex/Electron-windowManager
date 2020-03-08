import * as AppState from "../../core/AppState";
import { MessageType } from "../../core/comm/Message";
import { MS } from "../../core/comm/MessageSender"

export const openWindow = (): void => {
  MS.send(
    {
      windowId: "1",
      customUrl: "Login"
    },
    MessageType.OPEN_WINDOW
  );
};

export const startTick = (): void => {
  MS.send({
    action: "wee",
    data: "HOLA"
  });
};

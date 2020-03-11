import * as AppState from "../../../main/core/AppState";
import { MessageType } from "../../../main/core/comm/Message";
import { MS } from "../../../main/core/comm/MessageManager"

export const openWindow = (): void => {
  MS.send(
    {
      windowId: "2",
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

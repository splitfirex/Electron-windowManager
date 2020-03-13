import { MM, MessageType } from "../../../main/core/comm/MessageManager";

export const openWindow = (): void => {
  MM.send({ event: MessageType.NEW_WINDOW });
};

export const startTick = (): void => {
  MM.send({
    action: "wee",
    payload: { data: "HOLA" }
  });
};

import { MM, MessageType } from "../../../main/core/comm/MessageManager";



export const startTick = (): void => {
  MM.send({
    action: "wee",
    payload: { data: "HOLA" }
  });
};

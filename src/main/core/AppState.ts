import * as Electron from "electron";
import { MM, MessageType } from "./comm/MessageManager";

export const init = () => {
  let valor = 0;
  setInterval(
    () =>{
    console.log(valor+1);
      MM.sendTo({
        event: MessageType.SYNC,
        action: "/wee",
        payload: ++valor
      })
    },
    1
  );
};

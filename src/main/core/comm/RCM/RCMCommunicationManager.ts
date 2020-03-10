import * as Stomp from "@stomp/rx-stomp";
import * as SockJS from "sockjs-client";
import { IMessage, IFrame } from "@stomp/stompjs";
import { RxStompState } from "@stomp/rx-stomp";
import { RCMMessage } from "./RCMMessage";
import { RCMState, RCMStatetemp } from "./model/RCMState";
import { RCMMetaAppData } from "./model/RCMMetaAppData";
import { createType } from "./model/RCMFactory";
import * as IP from "ip";

Object.assign(global, {
  WebSocket: require("ws"),
  TextEncoder: require("text-encoding").TextEncoder,
  TextDecoder: require("text-encoding").TextDecoder
});

export const init = () => {
  const client = new Stomp.RxStomp();

  client.configure({
    webSocketFactory: () => new SockJS("http://localhost:8777/websocket-test"),
    debug: function(str) {
      //  console.log(str);
    },

    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  client.connectionState$.subscribe((state: RxStompState) => {
    if (state == RxStompState.OPEN)
      client.publish({
        destination: "/app/connect",
        body: JSON.stringify({ clientIp: IP.address(), clientPort: "9999" })
      });
  });

  client.watch("/listeners/connected").subscribe({
    next: (data: IMessage) => {
      let tempState = JSON.parse(data.body);
      Object.keys(tempState).forEach(key => {
        RCMState.set(
          key,
          Object.assign(new RCMMetaAppData(), {
            ...tempState[key]
          })
        );
      });
    },
    error: err => console.log(err)
  });

  client.watch("/listeners/receive/creates").subscribe({
    next: (data: IMessage) => {
      let msgTemp = <RCMMessage>JSON.parse(data.body);

      try{
      if (!RCMStatetemp.has(msgTemp.idClass))
        RCMStatetemp.set(
          msgTemp.idClass,
          Object.assign(createType(msgTemp.class), {
            [msgTemp.attribute]: msgTemp.value
          })
        );


      Object.assign(RCMStatetemp.get(msgTemp.idClass), {
        [msgTemp.attribute]: msgTemp.value
      });

      if (msgTemp.attribute === "uuid" && !RCMState.has(msgTemp.value))
        RCMState.set(msgTemp.value, RCMStatetemp.get(msgTemp.idClass));
      }catch(err){
        console.log(err)
      }
    },
    error: err => console.log(err)
  });

  client.activate();
};

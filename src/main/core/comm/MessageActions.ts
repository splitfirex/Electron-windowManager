import { MM, BasicMessage, MessageType } from "./MessageManager";

MM.sender.subscribe(message => {
  switch (message.event) {
    case MessageType.SYNC:
      sync(message);
  }
});

const sync = (message: BasicMessage) => {
  MM.updater.next(message);
};

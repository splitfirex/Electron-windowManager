export interface BasicMessage {
  event?: MessageType;
  action?: string;
  idSender?: number;
  idReceiver?: number;
  resend?: boolean;
  payload: any;
}

export enum MessageType {
  OPEN_WINDOW,
  SHOW_WINDOW,
  SYNC
}

export enum EventType {
  INIT_TAB,
  SHOW_WINDOW,
  SYNC
}

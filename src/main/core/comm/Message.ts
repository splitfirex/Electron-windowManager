export interface BasicMessage {
  event?: MessageType;
  action?: string;
  idSender?: number;
  idReceiver?: number;
  resend?: boolean;
  payload: any;
}

export enum MessageType{
    OPEN_WINDOW,
    SYNC
}
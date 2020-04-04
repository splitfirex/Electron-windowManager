import { Subscription } from "rxjs";

export interface IWindowState {
  windows: Map<number,IWindow>;
}

export interface ITab {
  uuid: string;
  order: number;
  title: string;
}

export interface IWindow {
  uuid: number;
  browser: Electron.BrowserWindow;
  subscription: Subscription;
  tabs?: { [uuid: string]: ITab };
}

export interface IComponentDefinition {
  id: number;
  component: string;
  title: string;
  subtitle: string;
  iconName: string;
  state: { currentWindow?: number; available: boolean; showing: boolean };
}
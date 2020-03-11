export const state: Istate = {
  windows: []
};

interface Istate {
  windows: Array<IWindow>;
}

export interface ITab {
  uuid: string;
  order: number;
  title: string;
}

export interface IWindow {
  uuid: number;
  wm: Electron.BrowserWindow;
  tabs?: { [uuid: string]: ITab };
}

export const createNewWindow = (
  uuid: number,
  wm: Electron.BrowserWindow
): IWindow => {
  const result: IWindow = {
    uuid: uuid,
    wm: wm
  };
  return result;
};

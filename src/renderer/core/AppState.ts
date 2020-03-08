export const state: Istate = {
  user: "",
  password: "",
  windows: {}
};

interface Istate {
  ipcMain?: Electron.IpcMain;
  parentWindow?: Electron.EventEmitter;
  user: String;
  password: String;
  windows: { [key: string]: Electron.BrowserWindow };
}

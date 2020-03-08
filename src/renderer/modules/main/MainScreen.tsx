import * as React from "react";
import * as Electron from "electron";
import { openWindow, startTick } from "./MainScreenActions";
import { MainLayout } from "@/renderer/layout/MainLayout";
import { TabManager } from "@/renderer/layout/TabManager";

export const MainScreenComponent: React.FunctionComponent = (): JSX.Element => {
  Electron.ipcRenderer.on("wee", (data: any) => {
    console.log(data);
  });

  return (
    <MainLayout>
      <TabManager></TabManager>
      <button onClick={openWindow}>openWindow</button>
      <button onClick={startTick}>startTick</button>
    </MainLayout>
  );
};

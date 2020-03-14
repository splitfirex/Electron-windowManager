import * as React from "react";
import * as Electron from "electron";
import { MainLayout } from "@/renderer/layout/MainLayout";
import { TabManager } from "@/renderer/layout/TabManager";

export const MainScreenComponent: React.FunctionComponent = (): JSX.Element => {
  Electron.ipcRenderer.on("wee", (data: any) => {
    console.log(data);
  });

  return (
    <MainLayout>
      <TabManager></TabManager>
    </MainLayout>
  );
};

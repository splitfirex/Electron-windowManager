import * as React from "react";
import * as Electron from "electron";
import { MainLayout } from "@/renderer/layout/MainLayout";
import { TabManager } from "@/renderer/layout/uicomponents/TabManager";
import { VideograficoComponent } from "../videografico/VideograficoComponente";
import { ComunicacionesComponent } from "../comunicaciones/ComunicacionesComponente";
import { EstacionComponent } from "../estacion/EstacionComponente";

export const MainScreenComponent: React.FunctionComponent = (): JSX.Element => {
  return (
    <MainLayout>
      <TabManager></TabManager>
    </MainLayout>
  );
};

import { VideograficoComponent } from "@/renderer/modules/videografico/VideograficoComponente";
import * as React from "react";
import { ComunicacionesComponent } from "@/renderer/modules/comunicaciones/ComunicacionesComponente";
import { EstacionComponent } from "@/renderer/modules/estacion/EstacionComponente";
import { IComponentDefinition } from "@/main/core/window/IWindowState";

const Components: { [key: string]: React.FunctionComponent<IComponentDefinition> } = {
  "VideograficoComponent": VideograficoComponent,
  "ComunicacionesComponent": ComunicacionesComponent,
  "EstacionComponent": EstacionComponent
};

export default (componentDefinition: IComponentDefinition ) : React.ReactElement => {
    // component does exist
    const TypeComponent = Components[componentDefinition.component];

    return <TypeComponent {...componentDefinition} ></TypeComponent>
  }
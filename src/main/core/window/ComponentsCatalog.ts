import { IComponentDefinition } from "./IWindowState";

const components: IComponentDefinition[] = [
  {
    id: 0,
    component: "ComunicacionesComponent",
    iconName: "Phone",
    title: "Comunicaciones",
    subtitle: "Modulo de comunicaciones",
    state: { showing: false, available: true }
  },
  {
    id: 1,
    component: "EstacionComponent",
    iconName : "Train",
    title : "Estación",
    subtitle : "Visualizador de estacion",
    state: { showing: false, available: true }
  },
  {
    id : 2,
    component: "VideograficoComponent",
    iconName : "Nav2DMapView",
    title : "Videografico",
    subtitle : "Visualizador del entorno virtual",
    state: { showing: false, available: true }
  }
];

export default components;
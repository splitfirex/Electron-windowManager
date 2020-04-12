import * as soap from "soap";
import { expose } from "comlink";
import { mainProcObjectEndpoint } from "comlink-electron-adapter";

let ejerciciosWS = "http://vmgeoapps1:9080/sct/ejerciciosWS?wsdl";
let ejerciciosWSClient = soap.createClientAsync(ejerciciosWS);

export interface IWSManager {
  getSvgMundo(CP: boolean, nombreFichero: string): string;
}

export class WSManager {
  public getSvgMundo(CP: boolean, nombreFichero: string) {
    return ejerciciosWSClient.then((client: any) => {
      return client
        .getSvgMundoAsync({
          arg0: { CP: CP, nombreFichero: nombreFichero },
        })
        .then((data: any) => {
          return data[0].__attachments__[1].content;
        });
    });
  }
}


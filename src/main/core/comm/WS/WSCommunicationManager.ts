import * as soap from "soap";

let ejerciciosWS = "http://vmgeoapps1:9080/sct/ejerciciosWS?wsdl";
let ejerciciosWSClient = soap.createClientAsync(ejerciciosWS);

export const getSvgMundo = (
  CP: boolean,
  nombreFichero: string
): Promise<any> => {
  return ejerciciosWSClient.then((client: any) => {
    return client.getSvgMundoAsync({
      arg0: { CP: CP, nombreFichero: nombreFichero }
    });
  });
};

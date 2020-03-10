import { RCMMetaAppData } from "./RCMMetaAppData";

export function createType(name: string) {
  var types: {
    [key: string]: any;
  } = {
    RCMMetaAppData: RCMMetaAppData
  };
  return types.hasOwnProperty(name)
    ? new Proxy(new types[name](), changeAttributeHandler)
    : null;
}

const changeAttributeHandler: ProxyHandler<any> = {
  set(target: any, p: PropertyKey, value: any, receiver: any): boolean {
    if (target[p] !== value) {
      console.log(
        "VALOR DIFERENTE para " +
          p.toString() +
          " ACTUAL: " +
          target[p] +
          " NUEVO: " +
          value
      );
      return true;
    }
    return false;
  }
};

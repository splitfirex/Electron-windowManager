import { BrowserWindow } from "electron";
import * as fs from "fs";
import * as path from "path";
import { Observable } from "rxjs";

export const readFile = new Promise<string[]>((resolve, reject) => {
  fs.readFile(path.resolve(__dirname, "./test.txt"), "utf-8", (err, data) => {
    if (err) throw err;
    var values = data.toString().split("\n");
    resolve(values);
  });
});

export const datosStream = new Observable(subscriber => {
  var contador = 0;
  setInterval(() => {
    // contador += 1;
    subscriber.next(contador);
  }, 1000);
});

export const datosStream2 = new Observable(subscriber => {
  var prueba = { p1: false, p2: "2" };
  setInterval(() => {
    prueba.p1 = !prueba.p1;
    console.log(prueba);
    subscriber.next(prueba);
  }, 1000);
});

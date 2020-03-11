import { MS } from "../../../main/core/comm/MessageManager";

export const commitlogin = (user: String, pass: String): Promise<String[]> => {
  return new Promise<String[]>(resolve => {
    resolve([user, pass]);
  });
};

export const showId = () => {
  MS.send({ action: "show-id", data: "DATOS" });
};

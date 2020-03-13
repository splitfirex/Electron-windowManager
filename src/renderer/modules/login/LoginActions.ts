import { MM } from "../../../main/core/comm/MessageManager";

export const commitlogin = (user: String, pass: String): Promise<String[]> => {
  return new Promise<String[]>(resolve => {
    resolve([user, pass]);
  });
};

export const showId = () => {
  MM.send({ action: "show-id", payload: { data: "DATOS" } });
};

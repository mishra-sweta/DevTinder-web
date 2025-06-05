import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  return io(BASE_URL);
};

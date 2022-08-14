import axios from "./axios";
import { API } from "constants";

interface ILoginReq {
  email: string;
  password: string;
}

export const fetchLogin = async (payload: ILoginReq) => {
  const res = await axios.post(API.LOGIN, payload);
  return res;
};

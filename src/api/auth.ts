import axios, { axiosPrivate } from "./axios";
import { API } from "constants";
import { IAuth, IUser } from "types/Auth";
import { AxiosResponse } from "axios";
interface ILoginReq {
  email: string;
  password: string;
}

interface ILogoutRes {
  success: boolean;
}

export const fetchLogin = async (payload: ILoginReq): Promise<IAuth> => {
  const res: AxiosResponse<IAuth, ILoginReq> = await axios.post(
    API.LOGIN,
    payload
  );
  return res.data;
};

export const fetchUser = async (): Promise<IUser> => {
  const res: AxiosResponse<IUser> = await axiosPrivate.get(API.GET_USER);
  return res.data;
};

export const fetchLogout = async (): Promise<ILogoutRes> => {
  const res: AxiosResponse<ILogoutRes> = await axiosPrivate.get(API.LOGOUT);
  return res.data;
};

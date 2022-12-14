import axios, { axiosPrivate } from "./axios";
import { API } from "constants";
import { IAuth, IUser, IRegisterReq } from "types/Auth";
import { AxiosResponse } from "axios";
interface ILoginReq {
  email: string;
  password: string;
}

interface ILogoutRes {
  success: boolean;
}

interface IRegistrationReq extends Partial<IUser> {
  email: string;
  password: string;
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
  const res: AxiosResponse<ILogoutRes> = await axiosPrivate.post(API.LOGOUT);
  return res.data;
};

export const registerUser = async (payload: IRegisterReq): Promise<IAuth> => {
  const res: AxiosResponse<IAuth, IRegistrationReq> = await axios.post(
    API.REGISTRATION,
    payload
  );
  return res.data;
};

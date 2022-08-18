import { axiosPrivate } from "api/axios";
import { AxiosResponse } from "axios";
//Types
import { API } from "constants";
import { IUser } from "types/Auth";
import { ITodo, ITodos } from "types/Todo";

type AddTodo = Partial<ITodo>;

interface IRemovedTodoRes {
  success: boolean;
  data: IUser;
}

export const fetchAllTodos = async (): Promise<ITodos> => {
  const res: AxiosResponse<ITodos> = await axiosPrivate.get(API.TODOS);
  return res.data;
};

export const addTodo = async (payload: AddTodo): Promise<ITodo> => {
  const res: AxiosResponse<ITodo, AddTodo> = await axiosPrivate.post(
    API.TODOS,
    payload
  );
  return res.data;
};

export const removeTdo = async (id: string): Promise<IRemovedTodoRes> => {
  const res: AxiosResponse<IRemovedTodoRes, string> = await axiosPrivate.delete(
    `${API.TODOS}/${id}`
  );
  return res.data;
};

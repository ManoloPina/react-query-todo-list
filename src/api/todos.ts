import { axiosPrivate } from "api/axios";
import { AxiosResponse } from "axios";
//Types
import { API } from "constants";
import { ITodo, ITodos } from "types/Todo";

type AddTodo = Partial<ITodo>;

export const fetchAllTodos = async (): Promise<ITodos> => {
  const res: AxiosResponse<ITodos> = await axiosPrivate.get(API.GET_ALL_TODOS);
  return res.data;
};

export const addTodo = async (payload: AddTodo): Promise<ITodo> => {
  const res: AxiosResponse<ITodo, AddTodo> = await axiosPrivate.post(
    API.GET_ALL_TODOS,
    payload
  );
  return res.data;
};

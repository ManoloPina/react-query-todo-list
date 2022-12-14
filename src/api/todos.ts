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

interface CommonRes<Data> {
  success: boolean;
  data: Data;
}

interface ITodoPagination {
  limit: number;
  skip: number;
}

export const fetchAllTodos = async (
  pagination?: ITodoPagination
): Promise<ITodos> => {
  const res: AxiosResponse<ITodos> = await axiosPrivate.get(API.TODOS, {
    params: pagination,
  });
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
  throw new Error("I Ai se fudi!");
  return res.data;
};

export const updateTodoById = async (
  todo: ITodo
): Promise<CommonRes<ITodo>> => {
  const { _id, createdAt, __v, updatedAt, owner, ...rest } = todo;
  const res: AxiosResponse<CommonRes<ITodo>, string> = await axiosPrivate.put(
    `${API.TODOS}/${todo._id}`,
    { ...rest }
  );
  return res.data;
};

export interface ITodo {
  _id: string;
  completed: boolean;
  description: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ITodos {
  count: number;
  data: ITodo[];
}

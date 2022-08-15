export interface IUser {
  age: number;
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IAuth {
  user: IUser;
  token: string;
}

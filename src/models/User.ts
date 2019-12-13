export interface IUserData {
  _id: number;
  name: string;
  email: string;
  createdAT: Date;
  updatedAt: Date;
  _v: number;
}

export interface IUser {
  user: IUserData;
  token: string;
}

export interface IForgetPasswordRes {
  message: string;
}

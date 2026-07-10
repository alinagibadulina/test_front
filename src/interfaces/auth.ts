export interface ILogin {
  email: string;
  password: string;
}

export interface IRefresh {
  accessToken: string;
  refreshToken: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  id: number;
}

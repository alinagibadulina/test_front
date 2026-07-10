import type { ILogin, IRegister, IUser } from "@/interfaces/auth";
import { api } from "./axios";

export const login = async (data: ILogin) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const logout = async (): Promise<IUser[]> => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export const register = async (data: IRegister) => {
  const response = await api.post("/users/register", data);

  return response.data;
};

export const getUsers = async (): Promise<IUser[]> => {
  const response = await api.get("/users");

  return response.data;
};

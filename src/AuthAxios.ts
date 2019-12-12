import axios, { AxiosResponse, AxiosError } from "axios";
import { IFormData, ISignInForm } from "./types";
import { IUser } from "./models/User";
import { IServerError } from "./models/ServerError";

const token = localStorage.getItem("userToken");

const authAxios = axios.create({
  baseURL: "http://127.0.0.1:3000"
});

if (token) {
  authAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export const authRequest = async (
  url: string,
  data: IFormData | ISignInForm
) => {
  try {
    const res: AxiosResponse<IUser> = await authAxios.post(url, data);
    const userToken = res.data.token;
    const user = res.data.user;
    localStorage.setItem("userToken", userToken);
    return { userToken, user };
  } catch (err) {
    return Promise.reject(err.response.data as IServerError);
  }
};

export default authAxios;

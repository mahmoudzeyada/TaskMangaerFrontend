import axios, { AxiosResponse, AxiosError } from "axios";
import { IFormData, ISignInForm } from "./types";
import { IUser } from "./models/User";
import { IServerError } from "./models/ServerError";
import store from "./store";

const token = localStorage.getItem("userToken");

const authAxios = axios.create({
  baseURL: "http://127.0.0.1:3000"
});

if (token) {
  authAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

// interceptor of 401 un authorized errors
authAxios.interceptors.response.use(undefined, function(err) {
  return new Promise((resolve, reject) => {
    if (
      err.status === 401 &&
      err.response.data.error === "authentication cardinalities are wrong"
    ) {
      store.dispatch("Auth/logOut");
    }
    throw err;
  });
});
export const authRequest = async (
  url: string,
  data?: IFormData | ISignInForm
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

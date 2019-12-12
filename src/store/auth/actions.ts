import { ActionTree } from "vuex";

import { IAuthState, IFormData, ISignInForm } from "@/types";
import authAxios, { authRequest } from "@/AuthAxios";

const actions: ActionTree<IAuthState, any> = {
  async signUp({ commit }, data: IFormData): Promise<void> {
    try {
      commit("AUTH_REQUEST");
      const { user, userToken } = await authRequest("/users", data);
      commit("AUTH_SUCCESS", userToken);
    } catch (err) {
      commit("AUTH_ERROR");
      localStorage.removeItem("userToken");
      throw new Error(err);
    }
  },
  async signIn({ commit }, data: ISignInForm): Promise<void> {
    try {
      commit("AUTH_REQUEST");
      const { user, userToken } = await authRequest("/login", data);
      commit("AUTH_SUCCESS", userToken);
    } catch (err) {
      commit("AUTH_ERROR");
      localStorage.removeItem("userToken");
      return Promise.reject(err);
    }
  }
};

export default actions;

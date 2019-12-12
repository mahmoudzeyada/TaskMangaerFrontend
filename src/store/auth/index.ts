import { Module } from "vuex";

import { IAuthState } from "@/types";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state: IAuthState = {
  token: localStorage.getItem("user-token") || "",
  status: "error"
};

const namespaced = true;

const Auth: Module<IAuthState, any> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};

export default Auth;

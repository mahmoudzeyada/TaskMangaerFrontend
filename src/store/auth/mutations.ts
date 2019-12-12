import { MutationTree } from "vuex";
import { IAuthState } from "@/types";

const mutations: MutationTree<IAuthState> = {
  AUTH_REQUEST(state): void {
    state.status = "loading";
  },
  AUTH_SUCCESS(state, token: string): void {
    state.status = "success";
    state.token = token;
  },
  AUTH_ERROR(state): void {
    state.status = "error";
  },
  AUTH_LOGOUT(state): void {
    state.token = "";
    state.status = "";
  }
};

export default mutations;

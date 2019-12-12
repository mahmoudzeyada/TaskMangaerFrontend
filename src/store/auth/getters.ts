import { GetterTree } from "vuex";
import { IAuthState, Tstatus } from "@/types";

const getters: GetterTree<IAuthState, any> = {
  isAuthenticated: (state): boolean => !!state.token,
  authState: (state): Tstatus => state.status
};

export default getters;

export interface IFormData {
  name: string;
  password: string;
  confirmPassword?: string;
  email: string;
  age?: number | null;
}

export type Tstatus = "loading" | "success" | "error" | "";
export interface IAuthState {
  token: string;
  status: Tstatus;
}

export interface ISignInForm {
  payload: string;
  password: string;
}

import http from "./httpServices";
import { SignupType } from "./types";

export async function signupApi(data: SignupType) {
  return http.post(`/user/signup`, data).then(({ data }) => data);
}

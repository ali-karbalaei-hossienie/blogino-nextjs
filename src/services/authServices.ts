import { LoginValues } from "@/app/(auth)/lib/authSchemas";
import http from "./httpServices";
import { authTpe } from "./types";

export async function signupApi(data: authTpe) {
  return http.post(`/user/signup`, data).then(({ data }) => data);
}

export async function signinApi(data: LoginValues) {
  return http.post(`/user/signin`, data).then(({ data }) => data);
}

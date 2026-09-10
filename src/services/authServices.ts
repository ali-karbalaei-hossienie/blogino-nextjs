import { LoginValues } from "@/app/(auth)/lib/authSchemas";
import http from "./httpServices";
import { authTpe } from "./types";

export async function signupApi(data: authTpe) {
  return http.post(`/user/signup`, data).then(({ data }) => data);
}

export async function signinApi(data: LoginValues) {
  return http.post(`/user/signin`, data).then(({ data }) => data);
}

export async function getUserApi() {
  return http.get(`/user/profile`).then(({ data }) => data);
}

export function logoutApi() {
  return http.post(`/user/logout`);
}

export async function getAllUsersApi(options: any) {
  return http.get(`/user/list`, options).then(({ data }) => data.data);
}

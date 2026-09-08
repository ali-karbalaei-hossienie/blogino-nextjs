import http from "./httpServices";

export async function likePostApi(id: string) {
  return http.post(`/post/like/${id}`).then(({ data }) => data.data);
}

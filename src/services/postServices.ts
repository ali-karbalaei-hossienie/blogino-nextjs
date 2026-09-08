import http from "./httpServices";

export async function likePostApi(id: string) {
  return http.post(`/post/like/${id}`).then(({ data }) => data.data);
}

export async function bookmarkPostApi(id: string) {
  return http.post(`/post/bookmark/${id}`).then(({ data }) => data.data);
}

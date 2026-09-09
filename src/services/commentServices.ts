import http from "./httpServices";

interface CreateCommentData {
  parentId?: string;
  text: string;
  postId: string;
}

export async function createCommentApi(data: CreateCommentData, options = {}) {
  return http.post(`/comment/add`, data, options).then(({ data }) => data);
}

import { BlogPost } from "@/app/types";
import http from "./httpServices";

export async function likePostApi(id: string) {
  return http.post(`/post/like/${id}`).then(({ data }) => data.data);
}

export async function bookmarkPostApi(id: string) {
  return http.post(`/post/bookmark/${id}`).then(({ data }) => data.data);
}

export async function getAllPostsApi(
  queries = {},
  options = {},
): Promise<{ message: string; posts: BlogPost[] }> {
  // Artificially delay a response for demo purposes.
  // Don't do this in production :)

  // console.log('Fetching revenue data...');
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return http
    .get(`/post/list?${queries}`, options)
    .then(({ data }) => data.data);
}

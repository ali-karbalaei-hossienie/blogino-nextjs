import setCookiesOnReq from "@/utils/setCookiesOnRequest";
import { cookies } from "next/headers";
import { getAllUsersApi } from "./authServices";
import { getAllPostsApi } from "./postServices";
import { getAllCommentsApi } from "./commentServices";

export async function fetchCardData() {
  const cookieStore = await cookies();
  const options = setCookiesOnReq(cookieStore);
  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getAllPostsApi(),
      getAllCommentsApi(options),
    ]);

    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfPosts = Number(data[1].posts.length ?? "0");
    const numberOfComments = Number(data[2].commentsCount ?? "0");

    return {
      numberOfPosts,
      numberOfUsers,
      numberOfComments,
    };
  } catch (error: any) {
    console.error("خطا", error.response.data.message);
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}

import { NextRequest } from "next/server";

export default async function middlewareAuth(req: NextRequest) {
  const options: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie:
        `${req.cookies.get("accessToken")?.name}=${
          req.cookies.get("accessToken")?.value
        }; ${req.cookies.get("refreshToken")?.name}=${
          req.cookies.get("refreshToken")?.value
        }` || "-",
    },
  };

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    options,
  )
    .then((res) => res.json())
    .then((res) => res.data);
  const { user } = data || {};
  return user;
}

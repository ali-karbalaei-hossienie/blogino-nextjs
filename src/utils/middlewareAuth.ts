import { NextRequest } from "next/server";

export default async function middlewareAuth(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  const cookies: string[] = [];

  if (accessToken) {
    cookies.push(`accessToken=${accessToken}`);
  }

  if (refreshToken) {
    cookies.push(`refreshToken=${refreshToken}`);
  }

  const backendBaseUrl =
    process.env.INTERNAL_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : "https://blogino-backend-production.up.railway.app/api");

  try {
    const response = await fetch(`${backendBaseUrl}/user/profile`, {
      method: "GET",
      headers: {
        Cookie: cookies.join("; "),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result?.data?.user ?? null;
  } catch (error) {
    console.error("Middleware authentication error:", error);
    return null;
  }
}

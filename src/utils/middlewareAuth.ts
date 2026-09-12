import { NextRequest } from "next/server";

export default async function middlewareAuth(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  const cookies: string[] = [];
  if (accessToken) cookies.push(`accessToken=${accessToken}`);
  if (refreshToken) cookies.push(`refreshToken=${refreshToken}`);

  const backendBaseUrl =
    process.env.INTERNAL_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : "https://blogino-backend-production.up.railway.app/api");

  try {
    const res = await fetch(`${backendBaseUrl}/user/profile`, {
      method: "GET",
      headers: {
        Cookie: cookies.join("; "),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data?.user ?? null;
  } catch (error) {
    console.error("Middleware fetch profile error:", error);
    return null;
  }
}

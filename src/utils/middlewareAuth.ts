// utils/middlewareAuth.ts
import { NextRequest } from "next/server";

export default async function middlewareAuth(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : "",
    refreshToken ? `refreshToken=${refreshToken}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  const backendBaseUrl =
    process.env.INTERNAL_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : "https://blogino-backend-production.up.railway.app/api");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${backendBaseUrl}/user/profile`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result?.data?.user ?? null;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Middleware authentication error:", error);
    return null;
  }
}

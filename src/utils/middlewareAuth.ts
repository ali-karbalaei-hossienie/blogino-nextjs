import { NextRequest } from "next/server";

export default async function middlewareAuth(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log("--- DEBUG MIDDLEWARE AUTH ---");
  console.log("1. AccessToken:", accessToken ? "Exists" : "MISSING");
  console.log("2. RefreshToken:", refreshToken ? "Exists" : "MISSING");

  if (!accessToken && !refreshToken) {
    console.log("❌ Reason: No cookies found in request!");
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

    console.log("3. Backend Response Status:", res.status);

    if (!res.ok) {
      console.log("❌ Reason: Backend returned status", res.status);
      return null;
    }

    const data = await res.json();
    console.log("4. Backend Response Data:", JSON.stringify(data));

    // بررسی ساختار داده برگشتی از بک‌اند
    const user =
      data?.data?.user || data?.user || (data?.data ? data.data : null);
    console.log("5. Extracted User:", user ? "Found" : "NULL");

    return user;
  } catch (error) {
    console.error("❌ Reason: Fetch Exception:", error);
    return null;
  }
}

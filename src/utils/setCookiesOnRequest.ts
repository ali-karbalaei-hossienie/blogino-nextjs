interface Cookie {
  name: string;
  value: string;
}

interface Cookies {
  get(name: string): Cookie | undefined;
}

interface RequestOptions {
  headers: {
    Cookie: string;
  };
}

export default function setCookiesOnReq(cookies: Cookies): RequestOptions {
  const options = {
    headers: {
      Cookie:
        `${cookies.get("accessToken")?.name}=${
          cookies.get("accessToken")?.value
        }; ${cookies.get("refreshToken")?.name}=${
          cookies.get("refreshToken")?.value
        }` || "-",
    },
  };

  return options;
}

"use server";

import { cookies } from "next/headers";

interface OptionsClienteHttp {
  method?: string;
  cache?: RequestCache;
  headers?: any;
  body?: any;
}

const getData = async (
  url: string,
  cache: RequestCache = "no-cache",
  method: string,
  body: any = null
) => {
  try {
    const headers = getHeadersGlobal();

    const options: OptionsClienteHttp = {};

    options.method = method;
    options.cache = cache;
    options.headers = headers;

    if (body) options.body = JSON.stringify(body);
    const urlBase = process.env.BASE_URL;

    const urlFull = `${urlBase}${url}`;

    const res = await fetch(urlFull, options);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getHeadersGlobal = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("authjs.local-token");
  const headers = new Map();
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Authorization", `Bearer ${token?.value}`);

  return headers;
};

export { getData, getHeadersGlobal };

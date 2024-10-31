"use server";

import { getData } from "@/utils";
const getUserAuth = async () => {
  try {
    const url = `/api/v1/perfil-usuario/perfil`;
    const { data } = await getData(url, "no-cache", "GET");

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getUserAuth };

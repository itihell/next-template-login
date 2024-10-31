"use server";
import { cookies } from "next/headers";
import { signOut } from "@/auth.config";
import { getData } from "@/utils";

const logout = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("authjs.local-token");
  //const url = `/oauth/tokens/${token?.value}`;
  //const url = `/oauth/tokens/cb95504537bfb46ab164887237ddaa5da98d12bd25595d75491e9837cba4680786ea4b8b32fb5557`;

  //console.log({ url });

  const payloadBase64 = token?.value.split(".")[1] ?? "";
  const payload = JSON.parse(atob(payloadBase64));
  const tokenId = payload["jti"] ?? "";

  const url = `/api/v1/perfil-usuario/logoaut-user/${tokenId}`;
  const { data } = await getData(url, "no-cache", "DELETE");
  //console.log({ data, hola: payload["jti"] ?? "" });

  if (parseInt(data) > 0) {
    cookieStore.delete("authjs.local-token");
    await signOut();
  }
};

export { logout };

"use server";

export async function getPerfilUser(token: string) {
  const url = `${process.env.BASE_URL}${process.env.AUTH0_USERINFO_URL}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}

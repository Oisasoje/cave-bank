import api from "../lib/api";

export async function start(phone: string) {
  return api("/auth/start", {
    method: "POST",
    body: JSON.stringify({
      phone,
    }),
  });
}

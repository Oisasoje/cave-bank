import api from "../lib/api";

export async function start(phone: string) {
  return api("/auth/start", {
    method: "POST",
    body: JSON.stringify({
      phone,
    }),
  });
}

export async function verify(id: string, pin: string) {
  return api("/auth/verify", {
    method: "POST",
    body: JSON.stringify({
      id,
      pin,
    }),
  });
}

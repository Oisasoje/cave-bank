import apiServer from "@/lib/api.server";

export function getUserServer() {
  return apiServer("/auth/me", { method: "GET" });
}

import { getUserServer } from "@/services/auth.server";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  try {
    const { data } = await getUserServer();
    return data;
  } catch {
    return null;
  }
});

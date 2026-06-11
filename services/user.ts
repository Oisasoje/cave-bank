import api from "@/lib/api";

export const getBalance = () => {
  return api("/user/getBalance", {
    method: "GET",
  });
};

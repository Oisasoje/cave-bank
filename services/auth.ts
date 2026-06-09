import api from "../lib/api";

export async function signupStart(phone: string) {
  return api("/auth/signup/start", {
    method: "POST",
    body: JSON.stringify({
      phone,
    }),
  });
}
export async function signupVerify(id: string, otp: string) {
  return api("/auth/signup/verify", {
    method: "POST",
    body: JSON.stringify({
      id,
      otp,
    }),
  });
}
export async function sendOTP(id: string) {
  return api("/auth/signup/resend-otp", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
  });
}

export async function loginStart(phone: string) {
  return api("/auth/login/start", {
    method: "POST",
    body: JSON.stringify({
      phone,
    }),
  });
}

export async function loginVerify(id: string, pin: string) {
  return api("/auth/login/verify", {
    method: "POST",
    body: JSON.stringify({
      id,
      pin,
    }),
  });
}

export function createPin(id: string, pin: string) {
  return api("/auth/signup/create-pin", {
    method: "POST",
    body: JSON.stringify({
      setup_token_id: id,
      pin,
    }),
  });
}

export function getUser() {
  return api("/auth/me", {
    method: "GET",
  });
}

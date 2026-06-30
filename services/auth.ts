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

export function verifyPin(pin: string) {
  return api("/auth/verify-pin", {
    method: "POST",
    body: JSON.stringify({
      pin,
    }),
  });
}

export function changePin(pin: string) {
  return api("/auth/change-pin", {
    method: "POST",
    body: JSON.stringify({
      newPin: pin,
    }),
  });
}

export function resetStart(id: string) {
  return api("/auth/reset-pin/start", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
  });
}

export function resetVerify(id: string, otp: string) {
  return api("/auth/reset-pin/verify-otp", {
    method: "POST",
    body: JSON.stringify({
      reset_token_id: id,
      otp,
    }),
  });
}

export function resetPin(id: string, pin: string) {
  return api("/auth/reset-pin/set-new-pin", {
    method: "POST",
    body: JSON.stringify({
      reset_token_id: id,
      newPin: pin,
    }),
  });
}

export function resetResendOTP(id: string) {
  return api("/auth/reset-pin/resend-otp", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
  });
}

export function logout() {
  return api("/auth/logout", {
    method: "POST",
  });
}

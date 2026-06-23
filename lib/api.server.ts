import { cookies } from "next/headers";

export const apiServer = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<any> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(sessionId ? { Cookie: `sessionId=${sessionId}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_URL_DEV || "http://localhost:8000";

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong. Please try again.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message
        ? data.message
        : data.error
          ? data.error
          : "Something went wrong. Please try again.",
    );
  }

  return data;
};

export default apiServer;

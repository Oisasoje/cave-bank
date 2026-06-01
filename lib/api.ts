const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const api = async (endpoint: String, options: RequestInit = {}) => {
  if (typeof window !== "undefined" && !window.navigator.onLine) {
    throw new Error("You are offline.");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong. Please try again.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
};

export default api;

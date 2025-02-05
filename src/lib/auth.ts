const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function parseCookies(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }

  return document.cookie.split(";").reduce((cookies, cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = decodeURIComponent(value || "");
    return cookies;
  }, {} as Record<string, string>);
}
export async function getUserSession() {
  const cookies = parseCookies();
  const token = cookies["authToken"];

  if (!token) {
    console.warn("No auth token found in cookies");
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/validate`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error(
        "Failed to validate token, response status:",
        response.status
      );

      if (response.status === 403) {
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return null;
      }

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
}

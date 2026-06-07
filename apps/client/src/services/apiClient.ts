const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

type RequestOptions = {
  headers?: Record<string, string>;
};

function getHeaders(options?: RequestOptions): HeadersInit {
  const demoUserId = localStorage.getItem("sdg_demo_user") ?? "guest";
  const token = localStorage.getItem("sdg_access_token");
  const storedProgressMode = localStorage.getItem("sdg_progress_mode") === "SEASON" ? "SEASON" : "LOCAL";
  const activeSeasonRaw = localStorage.getItem("sdg_active_season");
  const activeSeason = activeSeasonRaw ? JSON.parse(activeSeasonRaw) as { id?: string } : null;
  const effectiveProgressMode = options?.headers?.["x-progress-mode"] === "SEASON"
    ? "SEASON"
    : options?.headers?.["x-progress-mode"] === "LOCAL"
      ? "LOCAL"
      : storedProgressMode;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-demo-user": demoUserId,
    "x-progress-mode": effectiveProgressMode
  };

  if (effectiveProgressMode === "SEASON" && activeSeason?.id) {
    headers["x-season-id"] = activeSeason.id;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    ...headers,
    ...options?.headers
  };
}

export const apiClient = {
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      headers: getHeaders(options)
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json() as Promise<T>;
  },
  async post<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: "POST",
      headers: getHeaders(options),
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json() as Promise<T>;
  },
  async put<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: "PUT",
      headers: getHeaders(options),
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json() as Promise<T>;
  },
  async delete(path: string, options?: RequestOptions): Promise<void> {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: "DELETE",
      headers: getHeaders(options)
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
  }
};


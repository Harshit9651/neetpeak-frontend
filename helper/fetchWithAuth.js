export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
 

  const finalOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);

    if (response.status === 401 || response.status === 403) {
      console.warn("Unauthorized — logging out...");
      localStorage.clear();
      window.location.href = "/login";
      return null;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (err) {
    console.error("API call failed:", err.message);
    throw err;
  }
};

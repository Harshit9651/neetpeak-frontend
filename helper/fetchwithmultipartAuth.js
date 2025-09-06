export const fetchMultipartWithAuth = async (url, formData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    console.error("Multipart API call failed:", err.message);
    throw err;
  }
};

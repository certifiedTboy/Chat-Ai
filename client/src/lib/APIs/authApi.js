const BASE_URL = "https://chat-ai-server-mwfg.onrender.com/api/v1";
// const BASE_URL = "http://localhost:3001/api/v1";

export const userLogin = async (authToken) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ authToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

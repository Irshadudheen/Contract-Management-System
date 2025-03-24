import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  return data;
};

export const checkAuth = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  } catch {
    return null;
  }
};

export const logoutUser = async () => {
  await axiosInstance.post("/auth/logout");
};

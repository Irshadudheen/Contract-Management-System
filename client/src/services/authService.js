import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (login) => {
  const { data } = await axiosInstance.post("/users/signin", login);
  return data;
};
export const userSignUp = async (signup) => {
  const { data } = await axiosInstance.post("/users/signup", signup);
  return data;
};
export const checkAuth = async () => {
  try {
    const { data } = await axiosInstance.get("/users/me");
    return data;
  } catch {
    return null;
  }
};

export const logoutUser = async () => {
  await axiosInstance.post("/users/signout");
};


import { userAuthState } from "@/types/auth/userAuthState";

export const saveUserToLocalStorage = (user: userAuthState) => {
  try {
    localStorage.setItem("authState", JSON.stringify(user));
  } catch (error) {
    console.error("Storing user data to local storage failed", error);
  }
};

export const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem("authState");
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (error) {
    console.error(error);
  }
};

export const clearUserFromStorage = () => {
  localStorage.removeItem("authState");
};

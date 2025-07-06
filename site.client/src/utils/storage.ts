import { userAuthState } from "@/types/auth/userAuthState";

// Load only the user object
export const loadUserFromLocalStorage = (): userAuthState | null => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("authState");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const saveUserToLocalStorage = (user: userAuthState) => {
  try {
    localStorage.setItem("authState", JSON.stringify(user));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

export const clearUserFromStorage = () => {
  localStorage.removeItem("authState");
};

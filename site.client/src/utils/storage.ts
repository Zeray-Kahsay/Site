import { userAuthState } from "@/types/auth/userAuthState";

export const saveUserToLocalStorage = (user: userAuthState) => {
    try {
        localStorage.setItem("user", JSON.stringify(user))
    } catch (error) {
        console.error("no user data found");
    }
};

export const loadUserFromStorage = () => {
    try {
        const serializedUser = localStorage.getItem("user");
        return serializedUser ? JSON.parse(serializedUser) : null;
    } catch (error) {
        return null;
    }

}


export const clearUserFromStorage = () => {
    localStorage.removeItem("user");
};

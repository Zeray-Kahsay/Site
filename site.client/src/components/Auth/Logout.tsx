
import { logout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/store";
import { clearUserFromStorage } from "@/utils/storage";
import { useRouter } from "next/navigation";

const Logout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    clearUserFromStorage();
    router.push('/login');
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

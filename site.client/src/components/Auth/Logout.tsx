import { logout } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  return <button onClick={() => dispatch(logout())}>Logout</button>;
};

export default Logout;

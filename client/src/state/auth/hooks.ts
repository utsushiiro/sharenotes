import { useSelector } from "@state/store";
import { useDispatch } from "react-redux";
import { authOps } from ".";

export function useAuth() {
  const loginUser = useSelector(state => state.authState.values.loginUser);
  const dispatch = useDispatch();

  const login = (username: string, password: string) => {
    dispatch(authOps.login(username, password));
  };

  const logout = () => {
    dispatch(authOps.logout());
  };

  const signUp = (username: string, email: string, password: string) => {
    dispatch(authOps.signUp(username, email, password));
  };

  return {
    isAuthenticated: loginUser !== undefined,
    loginUser,
    login,
    logout,
    signUp
  };
}

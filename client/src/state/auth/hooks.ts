import { useSelector, useDispatch } from "@state/store";
import { authOps } from ".";

export function useAuth() {
  const loginUser = useSelector(state => state.authState.values.loginUser);
  const dispatch = useDispatch();

  const login = async (username: string, password: string) => {
    await dispatch(authOps.login(username, password));
  };

  const logout = async () => {
    await dispatch(authOps.logout());
  };

  const signUp = async (username: string, email: string, password: string) => {
    await dispatch(authOps.signUp(username, email, password));
  };

  return {
    isAuthenticated: loginUser !== undefined,
    loginUser,
    login,
    logout,
    signUp
  };
}

import { useSelector } from "@state/store";

export function useAuth() {
  const loginUser = useSelector(state => state.authState.values.loginUser);
  return { isAuthenticated: loginUser !== undefined, loginUser };
}

import { useDispatch } from "react-redux";
import { Path, LocationState } from "history";
import { push as routerPush } from "connected-react-router";

export function useRouter() {
  const dispatch = useDispatch();
  const push = (path: Path, state?: LocationState) => {
    dispatch(routerPush(path, state));
  };

  return {
    push
  };
}

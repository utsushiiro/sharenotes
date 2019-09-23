import { useDispatch } from "react-redux";
import { Path, LocationState } from "history";

export function useRouter() {
  const dispatch = useDispatch();
  const push = (path: Path, state?: LocationState) => {
    dispatch(push(path, state));
  };

  return {
    push
  };
}

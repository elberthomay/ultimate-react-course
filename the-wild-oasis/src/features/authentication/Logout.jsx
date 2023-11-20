import { useNavigate } from "react-router";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogout from "./useLogout";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
export default function Logout() {
  const { logoutIsLoading, logout } = useLogout();
  const navigate = useNavigate();
  return (
    <ButtonIcon
      disabled={logoutIsLoading}
      onClick={() => logout({}, { onSuccess: (data) => navigate("/login") })}
    >
      {" "}
      {logoutIsLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

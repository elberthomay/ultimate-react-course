import { HiMoon, HiSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../styles/DarkModeContext";
function DarkModeToggle() {
  const { darkMode, toggle } = useDarkMode();
  return (
    <ButtonIcon onClick={toggle}>
      {darkMode ? <HiSun /> : <HiMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;

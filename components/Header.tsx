import clsx from "clsx";
import "../styles/clsx-class.scss";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  darkModeVar,
  disableDarkMode,
  enableDarkMode,
} from "../src/utils/apollo";
import { useReactiveVar } from "@apollo/client";

export default function Header() {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <div
      className={clsx([
        "w100",
        "pa-2",
        "f800",
        "flex-s-b",
        "WBoxColor",
        "WBorderColor",
        "WFtColor",
      ])}
    >
      오늘 뭐 먹지
      <FontAwesomeIcon
        icon={darkMode ? faSun : faMoon}
        onClick={darkMode ? disableDarkMode : enableDarkMode}
      />
    </div>
  );
}

import { makeVar } from "@apollo/client";

const DARK_MODE = "DARK_MODE";

export const darkModeVar = makeVar(Boolean(""));
//   typeof window !== "undefined"
//     ? makeVar(Boolean(localStorage.getItem(DARK_MODE)))
//     : makeVar(Boolean("DARK_MODE"));

export const enableDarkMode = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
  }
};

export const disableDarkMode = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
  }
};

"use client";
import styled from "styled-components";
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
    <SHeader>
      오늘 뭐 먹지
      <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </DarkModeBtn>
    </SHeader>
  );
}

const SHeader = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.boxColor};
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.ftColor};
  display: flex;
  font-weight: 800;
  display: flex;
  justify-content: space-between;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

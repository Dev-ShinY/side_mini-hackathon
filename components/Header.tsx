"use client";
import styled from "styled-components";

export default function Header() {
  return <SHeader>오늘 뭐 먹지</SHeader>;
}

const SHeader = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  font-weight: 800;
`;

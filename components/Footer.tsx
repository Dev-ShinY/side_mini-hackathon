"use client";
import styled from "styled-components";

export default function Footer() {
  return <SFooter> 버그 문의 : yshin.dev@gmail.com</SFooter>;
}

const SFooter = styled.div`
  width: 100%;
  background-color: #24292f;
  color: gray;
  padding: 20px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: end;
`;

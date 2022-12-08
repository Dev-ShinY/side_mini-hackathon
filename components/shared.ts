import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 0px 20px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

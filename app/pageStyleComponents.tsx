"use client";
import React from "react";
import styled from "styled-components";
import { BaseBox } from "../components/shared";
import { Button } from "antd";

type Props = {
  children: React.ReactNode;
};

export const Title = ({ children }: Props) => {
  return <STitle>{children}</STitle>;
};
export const Filter = ({ children }: Props) => {
  return <SFilter>{children}</SFilter>;
};
export const FilterTitle = ({ children }: Props) => {
  return <SFilterTitle>{children}</SFilterTitle>;
};
export const FilterOption = ({ children }: Props) => {
  return <SFilterOption>{children}</SFilterOption>;
};
export const Needs = ({ children }: Props) => {
  return <SNeeds>{children}</SNeeds>;
};
export const MapContainer = ({ children }: Props) => {
  return <SMapContainer>{children}</SMapContainer>;
};
export const MapPoints = ({ children }: Props) => {
  return <SMapPoints>{children}</SMapPoints>;
};
export const NeedsDecision = ({ children }: Props) => {
  return <SNeedsDecision>{children}</SNeedsDecision>;
};
export const NeedsDecisionTitle = ({ children }: Props) => {
  return <SNeedsDecisionTitle>{children}</SNeedsDecisionTitle>;
};
export const NeedsDecisionBtn = ({ children }: Props) => {
  return <SNeedsDecisionBtn>{children}</SNeedsDecisionBtn>;
};
export const MapPoint = ({ children }: Props) => {
  return <SMapPoint>{children}</SMapPoint>;
};

const STitle = styled.div`
  margin: 10px 0;
  width: 95%;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.ftColor};
`;

// filter
const SFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 20px;
  padding: 10px 20px;
  width: 40%;
  height: 80px;
  border: none;
`;

const SFilterTitle = styled.div`
  width: 100px;
  border-right: 1px solid ${(props) => props.theme.borderColor};
  margin-right: 20px;
  padding-right: 20px;
`;

const SFilterOption = styled.div`
  width: 90%;
`;

// needs
const SNeeds = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const SNeedsDecision = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

const SNeedsDecisionTitle = styled.span`
  color: ${(props) => props.theme.ftColor};
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  font-size: 24px;
  border-right: 1px solid ${(props) => props.theme.borderColor};
  margin-right: 20px;
  padding-right: 20px;
`;

const SNeedsDecisionBtn = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

// map
const SMapContainer = styled(BaseBox)`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
`;

const SMapPoints = styled.div`
  width: 30%;
  color: ${(props) => props.theme.ftColor};
`;

const SMapPoint = styled.div`
  margin: 15px 0;
`;

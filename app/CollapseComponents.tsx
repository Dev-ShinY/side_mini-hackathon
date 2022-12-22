"use client";

import clsx from "clsx";
import "../styles/clsx-class.scss";
import { ApolloProvider } from "@apollo/client";
import { Button, Collapse, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { SubmitBtn } from "./SubmitBtn";
import { client } from "../src/utils/apollo";

export function CollapseComponents() {
  const [lunchType, setLunchType] = useState("lunch");
  const [placeType, setPlaceType] = useState("outSide");

  // needs
  const [needsList, setNeedsList] = useState([
    { title: "한식", value: 0 },
    { title: "중식", value: 0 },
    { title: "일식", value: 0 },
    { title: "분식", value: 0 },
  ]);

  // filter
  const optionsLunchType = [
    { label: "점심", value: "lunch" },
    { label: "회식", value: "free" },
  ];

  const optionsPlaceType = [
    { label: "외식", value: "outSide" },
    { label: "배달", value: "inSide" },
  ];

  const onChangeLunchType = ({ target: { value } }: RadioChangeEvent) => {
    setLunchType(value);
  };

  const onChangePlaceType = ({ target: { value } }: RadioChangeEvent) => {
    setPlaceType(value);
  };

  const onClickNeeds = (e: string, item: string) => {
    setNeedsList((current) =>
      current.map((obj) => {
        if (obj.title === item) {
          return { ...obj, value: Number(e) };
        }
        return obj;
      })
    );
  };

  return (
    <Collapse
      style={{ width: "90%" }}
      defaultActiveKey={["1"]}
      onChange={() => {
        // const map = mapRef.current;
        // if (map) map.relayout();
      }}
    >
      <CollapsePanel header="Filter" key="1">
        <CollapseBody>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* filter */}
            <div className={clsx(["w40", "pa-2", "flex-s-b"])}>
              <div className={clsx(["w50", "pr-2", "mr-2"])}>옵션</div>
              <div className={clsx(["w50"])}>
                <Radio.Group
                  options={optionsLunchType}
                  onChange={onChangeLunchType}
                  optionType="button"
                  style={{ marginRight: "20px" }}
                  value={lunchType}
                />
                <Radio.Group
                  options={optionsPlaceType}
                  onChange={onChangePlaceType}
                  optionType="button"
                  value={placeType}
                />
              </div>
            </div>

            {/* needs */}
            <div className={clsx(["w60", "h100"])}>
              {needsList.map((item: { title: string; value: number }) => (
                <div
                  className={clsx(["mr-2", "w100", "flex-center"])}
                  key={item.title}
                >
                  <div
                    className={clsx([
                      "mb-1",
                      "pr-2",
                      "f24",
                      "f800",
                      "border-r",
                    ])}
                  >
                    {item.title}
                  </div>

                  <div className={clsx(["w50", "flex-s-e"])}>
                    <span>별론데..</span>
                    <Button
                      value={-2}
                      shape="circle"
                      size={"middle"}
                      style={{
                        backgroundColor: item.value == -2 ? "#ff4d4f" : "white",
                        border: "1px solid #ff4d4f",
                      }}
                      onClick={(e) =>
                        onClickNeeds(
                          (e.target as HTMLButtonElement).value,
                          item.title
                        )
                      }
                    />
                    <Button
                      value={-1}
                      shape="circle"
                      size={"small"}
                      style={{
                        backgroundColor: item.value == -1 ? "#ff4d4f" : "white",
                        border: "1px solid #ff4d4f",
                      }}
                      onClick={(e) =>
                        onClickNeeds(
                          (e.target as HTMLButtonElement).value,
                          item.title
                        )
                      }
                    />
                    <Button
                      value={0}
                      shape="circle"
                      size={"small"}
                      style={{
                        backgroundColor: item.value == 0 ? "#dedede" : "white",
                        border: "1px solid #dedede",
                      }}
                      onClick={(e) =>
                        onClickNeeds(
                          (e.target as HTMLButtonElement).value,
                          item.title
                        )
                      }
                    />
                    <Button
                      value={1}
                      shape="circle"
                      size={"small"}
                      style={{
                        backgroundColor: item.value == 1 ? "#1890ff" : "white",
                        border: "1px solid #1890ff",
                      }}
                      onClick={(e) =>
                        onClickNeeds(
                          (e.target as HTMLButtonElement).value,
                          item.title
                        )
                      }
                    />
                    <Button
                      value={2}
                      shape="circle"
                      size={"middle"}
                      style={{
                        backgroundColor: item.value == 2 ? "#1890ff" : "white",
                        border: "1px solid #1890ff",
                      }}
                      onClick={(e) =>
                        onClickNeeds(
                          (e.target as HTMLButtonElement).value,
                          item.title
                        )
                      }
                    />
                    <span>사랑해요..</span>
                  </div>
                </div>
              ))}
            </div>

            <ApolloProvider client={client}>
              <SubmitBtn needsList={needsList} />
            </ApolloProvider>
          </div>
        </CollapseBody>
      </CollapsePanel>
    </Collapse>
  );
}

// collapse
const CollapsePanel = styled(Collapse.Panel)`
  &&& {
    border-radius: 8px;
  }
  background-color: ${(props) => props.theme.boxColor};
  .ant-collapse-content {
    color: ${(props) => props.theme.ftColor};
    background-color: ${(props) => props.theme.boxColor};
  }
  .ant-collapse-header-text {
    color: ${(props) => props.theme.ftColor};
  }
`;

const CollapseBody = styled.div`
  color: ${(props) => props.theme.ftColor};
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 20px;
`;

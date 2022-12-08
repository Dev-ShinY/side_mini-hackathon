"use client";

import styled from "styled-components";
import { BaseBox } from "../components/shared";
import { Collapse, Radio, Button } from "antd";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Home() {
  const [lunchType, setLunchType] = useState("lunch");
  const [placeType, setPlaceType] = useState("outSide");

  // collapse
  const { Panel } = Collapse;

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

  // needs
  const [needsList, setNeedsList] = useState([
    { title: "한식", value: 0 },
    { title: "중식", value: 0 },
    { title: "일식", value: 0 },
    { title: "분식", value: 0 },
  ]);

  return (
    <SContent>
      <STitle> Filter </STitle>
      <Collapse style={{ width: "95%" }} defaultActiveKey={["1"]}>
        <Panel header="Filter" key="1">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* filter */}
            <SFilter>
              <SfilterTitle>옵션</SfilterTitle>
              <SFilterOption>
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
              </SFilterOption>
            </SFilter>

            {/* needs */}
            <SNeeds>
              {needsList.map((item) => (
                <SNeedsDecision key={item.title}>
                  <SNeedsDecisionTitle>{item.title}</SNeedsDecisionTitle>

                  <SNeedsDecisionBtn>
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
                  </SNeedsDecisionBtn>
                </SNeedsDecision>
              ))}
            </SNeeds>
          </div>
        </Panel>
      </Collapse>

      <STitle> 지도 </STitle>
      <SMap>
        <Map
          center={{ lat: 36.4879, lng: 127.2611 }}
          style={{ width: "100%", height: "360px" }}
        >
          <MapMarker position={{ lat: 36.4879, lng: 127.2611 }}>
            <div style={{ color: "#000" }}>Hello DataMonsters!</div>
          </MapMarker>
        </Map>
      </SMap>
    </SContent>
  );
}

const SContent = styled.div`
  height: 90vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const STitle = styled.div`
  margin: 10px 0;
  width: 95%;
  font-size: 20px;
  font-weight: 600;
`;

// filter
const SFilter = styled(BaseBox)`
  width: 30%;
  height: 80px;
  border: none;
`;

const SfilterTitle = styled.div`
  border-right: 1px solid ${(props) => props.theme.borderColor};
  margin-right: 20px;
  padding-right: 20px;
`;

const SFilterOption = styled.div`
  width: 90%;
`;

// needs
const SNeeds = styled.div`
  width: 70%;
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
  color: #576071;
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
const SMap = styled(BaseBox)`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

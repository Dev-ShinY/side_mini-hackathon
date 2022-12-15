"use client";

import styled from "styled-components";
import { BaseBox } from "../components/shared";
import { Collapse, Radio, Button, message } from "antd";
import type { RadioChangeEvent } from "antd";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { gql } from "@apollo/client";
import "../styles/globals.css";
import {
  Restaurant,
  useRecommendRestaurantsQuery,
  useUpsertNeedsMutation,
} from "../src/utils/client";
import { ReactElement, JSXElementConstructor, ReactFragment, Key } from "react";

gql`
  mutation upsertNeeds($input: UpdateNeedsInput!) {
    upsertNeeds(input: $input) {
      date
      kor
      chn
      jpn
      flour
    }
  }

  query getNeeds($input: String!) {
    getNeeds(input: $input) {
      date
      kor
      chn
      jpn
      flour
    }
  }

  query recommendRestaurants($input: RecommendRestaurantInput!) {
    recommendRestaurants(input: $input) {
      id
      name
      landAddress
      roadAddress
      type
      lon
      lat
      dist
      tags
      beginTime
      endTime
      reviewRateAvg
      reviewCount
      thumbnailUrl
      localRate
      lastVisitAt
      score
    }
  }
`;

export default function Home() {
  const [lunchType, setLunchType] = useState("lunch");
  const [placeType, setPlaceType] = useState("outSide");

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

  // map
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [myMap, setMyMap] = useState();
  const mapRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    document.head.appendChild(script);
    script.addEventListener("load", () => setMapLoaded(true));
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(36.4879, 127.2611), // 지도의 중심좌표
        level: 8, // 지도의 확대 레벨
      };
      var map = new window.kakao.maps.Map(mapContainer as any, mapOption);
      setMyMap(map);
    });
  }, [mapLoaded]);

  // apollo
  const [upsertNeeds] = useUpsertNeedsMutation();
  const [recommendRestaurants, setRecommendRestaurants] =
    useState<Restaurant>();
  const [restaurantIndex, setRestaurantIndex] = useState(1);

  const { refetch: refetchRecommend } = useRecommendRestaurantsQuery({
    variables: {
      input: {
        date:
          new Date().getFullYear() +
          "-" +
          ("0" + (new Date().getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + new Date().getDate()).slice(-2),
        startIndex: (restaurantIndex - 1) * 5,
      },
    },
    onCompleted(data) {
      setRecommendRestaurants((data as any).recommendRestaurants);

      for (var i = 0; i < recommendRestaurants.length; i++) {
        var marker = new kakao.maps.Marker({
          map: myMap,
          position: new kakao.maps.LatLng(
            recommendRestaurants[i].lon,
            recommendRestaurants[i].lat
          ),
          title: recommendRestaurants[i].name,
        });
      }
    },
  });

  useEffect(() => {
    refetchRecommend();
  }, [refetchRecommend, restaurantIndex]);

  return (
    <SContent>
      <STitle> Filter </STitle>
      <Collapse
        style={{ width: "95%" }}
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
              {/* <SFilter>
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
              </SFilter> */}

              {/* needs */}
              <SNeeds>
                {needsList.map((item: { title: string; value: number }) => (
                  <SNeedsDecision key={item.title}>
                    <SNeedsDecisionTitle>{item.title}</SNeedsDecisionTitle>

                    <SNeedsDecisionBtn>
                      <span>별론데..</span>
                      <Button
                        value={-2}
                        shape="circle"
                        size={"middle"}
                        style={{
                          backgroundColor:
                            item.value == -2 ? "#ff4d4f" : "white",
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
                          backgroundColor:
                            item.value == -1 ? "#ff4d4f" : "white",
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
                          backgroundColor:
                            item.value == 0 ? "#dedede" : "white",
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
                          backgroundColor:
                            item.value == 1 ? "#1890ff" : "white",
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
                          backgroundColor:
                            item.value == 2 ? "#1890ff" : "white",
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
              <Button
                onClick={async () => {
                  await upsertNeeds({
                    variables: {
                      input: {
                        date:
                          new Date().getFullYear() +
                          "-" +
                          ("0" + (new Date().getMonth() + 1)).slice(-2) +
                          "-" +
                          ("0" + new Date().getDate()).slice(-2),
                        kor: needsList.filter(function (item) {
                          return item.title === "한식";
                        })[0].value,
                        chn: needsList.filter(function (item) {
                          return item.title === "중식";
                        })[0].value,
                        jpn: needsList.filter(function (item) {
                          return item.title === "일식";
                        })[0].value,
                        flour: needsList.filter(function (item) {
                          return item.title === "분식";
                        })[0].value,
                      },
                    },
                    onCompleted(data) {
                      console.log("success!!", data);
                    },
                  });
                  message.info("success!!");
                }}
              >
                Submit
              </Button>
            </div>
          </CollapseBody>
        </CollapsePanel>
      </Collapse>

      <STitle> 지도 </STitle>
      <SMapContainer>
        {/* 식당 리스트 */}
        <SMapPoints>
          <Button
            onClick={() => {
              if (restaurantIndex > 1) {
                setRestaurantIndex((body) => body - 1);
              }
            }}
          >
            △
          </Button>
          {recommendRestaurants &&
            recommendRestaurants?.map(
              (
                item: { type: string; id: number; name: string },
                index: number
              ) => {
                return (
                  <SMapPoint key={item.id}>
                    {(restaurantIndex - 1) * 5 + index + 1}. {item.name}(
                    {item.type})
                  </SMapPoint>
                );
              }
            )}
          <Button
            onClick={() => {
              setRestaurantIndex((body) => body + 1);
            }}
          >
            ▽
          </Button>
        </SMapPoints>
        {/* 지도 */}
        <div
          id="map"
          style={{ width: "70%", height: "100%" }}
          // ref={mapRef}
        ></div>
        {/* <Map
          center={{ lat: 36.4879, lng: 127.2611 }}
          style={{ width: "100%", height: "100%" }}
          id="map"
        >
          <MapMarker position={{ lat: 36.4879, lng: 127.2611 }}>
            <div style={{ color: "#000" }}>Hello DataMonsters!</div>
          </MapMarker>
          {recommendRestaurants?.map(
            (item: { lat: number; lon: number; id: number; name: any }) => {
              return (
                <MapMarker
                  key={item.id}
                  position={{ lat: item.lat, lng: item.lon }}
                >
                  <div style={{ color: "#000" }}>{item.name}</div>
                </MapMarker>
              );
            }
          )}
        </Map> */}
      </SMapContainer>
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
  background-color: ${(props) => props.theme.bgColor};
`;

const STitle = styled.div`
  margin: 10px 0;
  width: 95%;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.ftColor};
`;

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

const SfilterTitle = styled.div`
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

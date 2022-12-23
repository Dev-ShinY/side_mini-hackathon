"use client";
import clsx from "clsx";
import "../styles/clsx-class.scss";
import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { gql } from "@apollo/client";
import { Restaurant, useRecommendRestaurantsQuery } from "../src/utils/client";
import { Map, MapMarker } from "react-kakao-maps-sdk";

gql`
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

export function MapComponents() {
  // map
  const [restaurantIndex, setRestaurantIndex] = useState(1);
  const [clickRestaurant, setClickRestaurant] = useState({
    name: "",
    beginTime: "",
    endTime: "",
    roadAddress: "",
    tags: [""],
  });
  const [recommendRestaurants, setRecommendRestaurants] =
    useState<Restaurant>();
  const [mapCenter, setMapCenter] = useState<Array<number>>([
    36.4879, 127.2611,
  ]);

  const { loading: loadingRecommend, refetch: refetchRecommend } =
    useRecommendRestaurantsQuery({
      variables: {
        input: {
          date: "2022-12-09",
          // new Date().getFullYear() +
          // "-" +
          // ("0" + (new Date().getMonth() + 1)).slice(-2) +
          // "-" +
          // ("0" + new Date().getDate()).slice(-2),
          startIndex: (restaurantIndex - 1) * 5,
        },
      },
      onCompleted(data) {
        setRecommendRestaurants((data as any).recommendRestaurants);
      },
    });

  useEffect(() => {
    refetchRecommend();
  }, [refetchRecommend, restaurantIndex]);

  const mapRef = useRef();

  return (
    <>
      {/* 식당 리스트 */}
      <div className={clsx(["w30", "flex-column", "flex-s-b", "mr-2"])}>
        <Button
          onClick={() => {
            const map = mapRef.current;
            if (map) (map as any).relayout();
            if (restaurantIndex > 1) {
              setRestaurantIndex((body) => body - 1);
            }
          }}
          loading={loadingRecommend}
        >
          <></>
          {!loadingRecommend && <>△</>}
        </Button>
        {recommendRestaurants &&
          recommendRestaurants?.map(
            (
              item: {
                lat: number;
                lon: number;
                type: string;
                id: number;
                name: string;
                beginTime: string;
                endTime: string;
                roadAddress: string;
                tags: Array<string>;
              },
              index: number
            ) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    const map = mapRef.current;
                    if (map) (map as any).relayout();
                    setMapCenter([item.lon, item.lat]);
                    setClickRestaurant({
                      name: item.name,
                      beginTime: item.beginTime,
                      endTime: item.endTime,
                      roadAddress: item.roadAddress,
                      tags: item.tags,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {(restaurantIndex - 1) * 5 + index + 1}. {item.name}(
                  {item.type})
                </div>
              );
            }
          )}
        <Button
          onClick={() => {
            const map = mapRef.current;
            if (map) (map as any).relayout();
            setRestaurantIndex((body) => body + 1);
          }}
          loading={loadingRecommend}
        >
          <></>
          {!loadingRecommend && <>▽</>}
        </Button>
      </div>

      {/* 지도 */}
      <Map
        center={{ lat: mapCenter[0], lng: mapCenter[1] }}
        style={{ width: "80%", height: "100%" }}
        id="map"
        // ref/={mapRef}
      >
        {recommendRestaurants?.map((item: any) => {
          return (
            <MapMarker
              key={item.id}
              position={{ lat: item.lon, lng: item.lat }}
              title={item.name}
            >
              <div style={{ textAlign: "center" }}>{item.name}</div>
            </MapMarker>
          );
        })}
      </Map>
      <div className={clsx(["pa-2"])}>
        {clickRestaurant.name !== "" && (
          <>
            <div className={clsx(["mb-1", "f20", "f500", "border-b"])}>
              {clickRestaurant.name}
            </div>
            <div className={clsx(["mb-1"])}>
              <span className={clsx(["f500", "mr-2"])}>Open :</span>
              {clickRestaurant.beginTime}
            </div>
            <div className={clsx(["mb-1"])}>
              <span className={clsx(["f500", "mr-2"])}>Close :</span>
              {clickRestaurant.endTime}
            </div>
            <div className={clsx(["mb-1"])}>
              <span className={clsx(["f500", "mr-2"])}>주소 :</span>
              {clickRestaurant.roadAddress}
            </div>
            <div className={clsx(["mb-1"])}>{clickRestaurant.tags}</div>
          </>
        )}
      </div>
    </>
  );
}

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
  const [recommendRestaurants, setRecommendRestaurants] =
    useState<Restaurant>();

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
          △
        </Button>
        {recommendRestaurants &&
          recommendRestaurants?.map(
            (
              item: { type: string; id: number; name: string },
              index: number
            ) => {
              return (
                <div key={item.id}>
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
          ▽
        </Button>
      </div>

      {/* 지도 */}
      <Map
        center={{ lat: 36.4879, lng: 127.2611 }}
        style={{ width: "100%", height: "100%" }}
        id="map"
      >
        {recommendRestaurants?.map((item: any) => {
          return (
            <MapMarker
              key={item.id}
              position={{ lat: item.lon, lng: item.lat }}
              title={item.name}
            >
              <div>{item.name}</div>
            </MapMarker>
          );
        })}
      </Map>
    </>
  );
}

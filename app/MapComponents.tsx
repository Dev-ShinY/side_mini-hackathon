"use client";
import { MapPoints } from "./pageStyleComponents";
import { Button } from "antd";
import { useEffect, useState } from "react";

export function MapComponents() {
  // map
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [restaurantIndex, setRestaurantIndex] = useState(1);

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
    });
  }, [mapLoaded]);

  return (
    <>
      {/* 식당 리스트 */}
      <MapPoints>
        <Button
          onClick={() => {
            if (restaurantIndex > 1) {
              setRestaurantIndex((body) => body - 1);
            }
          }}
        >
          △
        </Button>
        {/* {recommendRestaurants &&
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
            )} */}
        <Button
          onClick={() => {
            setRestaurantIndex((body) => body + 1);
          }}
        >
          ▽
        </Button>
      </MapPoints>

      {/* 지도 */}
      <div id="map" style={{ width: "70%", height: "100%" }}></div>
    </>
  );
}

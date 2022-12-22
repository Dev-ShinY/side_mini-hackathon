"use client";
import clsx from "clsx";
import "../styles/clsx-class.scss";
import { CollapseComponents } from "./CollapseComponents";
import { MapComponents } from "./MapComponents";
import { Suspense } from "react";

export default function Home() {
  return (
    <div
      style={{
        height: "90vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* filter */}
      <div className={clsx(["w90", "mt-1", "mb-1", "f20", "f800"])}>Filter</div>
      <Suspense fallback={<p>Loading Filter...</p>}>
        <CollapseComponents />
      </Suspense>

      {/* map */}
      <div className={clsx(["w90", "mt-1", "mb-1", "f20", "f800"])}> 지도 </div>
      <Suspense fallback={<p>Loading Map...</p>}>
        <div
          className={clsx([
            "flex-row",
            "w90",
            "h100",
            "WBorderColor",
            "pa-2",
            "border-radius-1",
          ])}
        >
          <MapComponents />
        </div>
      </Suspense>
    </div>
  );
}

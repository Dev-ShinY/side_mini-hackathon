import "../styles/globals.css";

import { Title, MapContainer } from "./pageStyleComponents";
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
      <Title> Filter </Title>
      <Suspense fallback={<p>Loading Filter...</p>}>
        <CollapseComponents />
      </Suspense>

      {/* map */}
      <Title> 지도 </Title>
      <Suspense fallback={<p>Loading Map...</p>}>
        <MapContainer>
          <MapComponents />
        </MapContainer>
      </Suspense>
    </div>
  );
}

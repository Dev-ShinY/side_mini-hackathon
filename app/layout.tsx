"use client";

import "../styles/globals.css";
import Script from "next/script";
import { lightTheme } from "../styles/theme-style";
import { ThemeProvider } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_KEY;

  return (
    <html>
      <head>
        {/* <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services`}
        /> */}
      </head>
      <body>
        <ThemeProvider theme={lightTheme}>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

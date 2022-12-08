"use client";

import "../styles/globals.css";
import Script from "next/script";
import { darkTheme, lightTheme } from "../styles/theme-style";
import { ThemeProvider } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { darkModeVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <html>
      <head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services`}
          onLoad={() => console.log(`ㅁㄴㅇㄹ`)}
        />
      </head>
      <body>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

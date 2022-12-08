"use client";

import "../styles/globals.css";
import Script from "next/script";
import { darkTheme, lightTheme } from "../styles/theme-style";
import { ThemeProvider } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { darkModeVar } from "../src/utils/apollo";
import { useReactiveVar } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/utils/apollo";

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
        />
      </head>
      <body>
        <ApolloProvider client={client}>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}

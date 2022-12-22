/* eslint-disable @next/next/no-sync-scripts */
"use client";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/utils/apollo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services`}
        />
      </head>
      <body>
        <ApolloProvider client={client}>
          <Header />
          {children}
          <Footer />
        </ApolloProvider>
      </body>
    </html>
  );
}

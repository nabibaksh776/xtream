import Head from "next/head";
import "@/styles/style.scss";
import "@/app/global.css";
import SessionProviderWrapper from "@/components/ClientProvider/ClientWrapper";
import ReduxProvider from "@/redux/ReduxProvider";
import { Nunito } from "next/font/google";
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"], // Include '200' weight here
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({
  children, // Layouts must accept a children prop
}) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <ReduxProvider>
          <Head>
            <title>Xtreme Free Next Js Dashboard</title>
            <meta name="description" content="Xtreme Free Next Js Dashboard" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <body
            className={`${nunito.className} flex`}
            style={{ height: "100vh" }}
          >
            {children}
          </body>
        </ReduxProvider>
      </SessionProviderWrapper>
    </html>
  );
}

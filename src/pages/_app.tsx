import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import "../../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // From https://github.com/arp242/goatcounter/issues/482#issuecomment-1016033292
  const router = useRouter();
  useEffect(
    function sendGoatCounterEventsOnRoute() {
      const handleRouteChange = (path: string) => {
        // @ts-expect-error
        window?.goatcounter?.count?.({
          path,
        });
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    },
    [router.events]
  );

  return (
    <>
      {/* <Head></Head> */}
      <Component {...pageProps} />
      <Script
        data-goatcounter="https://codingrulesdev.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
        strategy="afterInteractive"
      ></Script>
    </>
  );
};

export default MyApp;

import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AuthProvider } from "@/context/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SeoSetting from "@/components/SeoSetting";
import Layout from "@/components/common/Layout";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
    useEffect(() => {
        const handleRouterChange = (url: any) => {
        gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouterChange);
        return () => {
        router.events.off("routeChangeComplete", handleRouterChange);
        };
    }, [router.events]);

  return (
    <>
      <SeoSetting />
      <AuthProvider>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_MEASUREMENT_ID}');
          `,
          }}
        />
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />
        </Layout>
      </AuthProvider>
    </>
  );
}

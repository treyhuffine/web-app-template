import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, VirtualConsoleProvider } from 'context';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useApollo } from 'utils/client/apolloClient';
import { getIsNativePlatform } from 'utils/mobile/getIsNativePlatform';
import 'styles/globals.css';

const APP_VIEWPORT = 'viewport-fit=cover, width=device-width, initial-scale=1';
const WEB_VIEWPORT = 'width=device-width, initial-scale=1';

export default function App({ Component, pageProps, err }: AppProps & { err: any }) {
  const apolloClient = useApollo(pageProps);
  const viewport = getIsNativePlatform() ? APP_VIEWPORT : WEB_VIEWPORT;

  return (
    <>
      <Head>
        <meta name="viewport" content={viewport} />

        {/* meta */}
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="manifest" href={`${process.env.APP_URL}/manifest.json`} />
        <link rel="shortcut icon" href={`${process.env.APP_URL}/icons/favicon.png`} />
        {/* <link
          rel="preload"
          href="public/fonts/mulish-v12-latin-regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link rel="preload" href="public/fonts/mulish-v12-latin-700.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="public/fonts/mulish-v12-latin-500.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="public/fonts/mulish-v12-latin-300.ttf" as="font" crossOrigin="" /> */}
        <meta name="application-name" content="" />
        <meta name="apple-mobile-web-app-title" content="" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: dark)" />
        {/* <link rel="mask-icon" href="/favicon-mask.svg" color="#FFF" /> */}

        {/* apple */}
        <link rel="apple-touch-icon" href={`${process.env.APP_URL}/icons/apple-icon.png`} />
      </Head>

      {/* <SessionProvider> */}
      <VirtualConsoleProvider>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider>
            {/* <StripeProvider> */}
            <Component {...pageProps} err={err} />
            {/* </StripeProvider> */}
          </ThemeProvider>
        </ApolloProvider>
      </VirtualConsoleProvider>
      {/* </SessionProvider> */}
    </>
  );
}

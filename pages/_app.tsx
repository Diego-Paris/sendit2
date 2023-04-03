import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import NextNProgress from "nextjs-progressbar";
import NProgress from "nprogress";

import Head from "next/head";

// import Router from 'next/router';
// import NProgress from 'nprogress';

// Router.events.on('routeChangeStart', () => {
//   NProgress.start();
// });

// Router.events.on('routeChangeComplete', () => {
//   NProgress.done();
// });

// Router.events.on('routeChangeError', () => {
//   NProgress.done();
// });

NProgress.configure({ showSpinner: false });

function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Head>
              <title>Send it.</title>
            </Head>
            <NextNProgress />
            <Navbar />
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </ChakraProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default App;

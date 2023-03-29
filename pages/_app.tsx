import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import  { useState } from 'react';

function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
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

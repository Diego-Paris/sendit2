import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default App;

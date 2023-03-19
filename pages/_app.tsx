import { SessionProvider } from "next-auth/react";
import { globalCss } from "stitches.config";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar/Navbar";

const globalStyles = globalCss({
  "*": {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
  },
  body: {
    fontFamily: "system-ui",
  },
  a: {
    color: "$secondary",
  },
});

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default App;

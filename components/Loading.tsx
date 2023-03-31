import { Box, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      height="15rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="3xl"
      css={{
        width: "4rem",
        height: "4rem",
        "@media screen and (min-width: 480px)": {
          width: "5rem",
          height: "5rem",
        },
        "@media screen and (min-width: 768px)": {
          width: "8rem",
          height: "8rem",
        },
      }}/>
    </Box>
  );
};

export default Loading;

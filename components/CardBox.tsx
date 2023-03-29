import { Box } from "@chakra-ui/react";

const CustomBox = ({ children, styles = {} }) => {
  return (
    <Box
      bg="white"
      p={6}
      rounded="md"
      w={{ base: "80%", md: "70%" }}
      maxW={{ base: "100%", md: "600px" }}
      minW={{ base: "80%", md: "600px" }}
      m={0}
      {...styles}
    >
      {children}
    </Box>
  );
};

export default CustomBox;
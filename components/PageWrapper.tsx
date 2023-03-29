import { Flex } from "@chakra-ui/react";

const PageWrapper = ({ children }) => {
  return (
    <Flex
      bg="gray.100"
      py={{ base: 6 }}
      flexDirection="column"
      gap="6"
      h="auto"
      minH={`calc(100vh - 73px)`}
      flexGrow={1}
    >
      {children}
    </Flex>
  );
};

export default PageWrapper;
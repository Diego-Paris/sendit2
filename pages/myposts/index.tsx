import ListMyPosts from "@/components/ListMyPosts";
import { getSession, useSession } from "next-auth/react";
import ProfileCard from "../../components/ProfileCard";
import { Flex, Text } from "@chakra-ui/react";
import CardBox from "@/components/CardBox";
import Logo from "@/components/Logo";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <>
      <Flex
        bg="gray.100"
        align="center"
        py={{ base: 6 }}
        flexDirection="column"
        gap="6"
        h="auto"
        minH={`calc(94vh)`}
        flexGrow={1}
      >
        {!session && (
          <>
            <CardBox>
              <Flex align="center" py={{ base: 6 }} flexDirection="column">
                <Logo />
                <Text fontSize="3xl" as="b">
                  Sign in and start posting!
                </Text>
              </Flex>
            </CardBox>
          </>
        )}
        {session && <ListMyPosts />}
      </Flex>
    </>
  );
}

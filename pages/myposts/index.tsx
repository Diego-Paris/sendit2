import ListMyPosts from "@/components/ListMyPosts";
import { getSession, useSession } from "next-auth/react";
import ProfileCard from "../../components/ProfileCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import CardBox from "@/components/CardBox";
import Logo from "@/components/Logo";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <>
        {!session && (
          <>
            <Box py={6}>
            <CardBox >
              <Flex align="center"  flexDirection="column">
                <Logo />
                <Text fontSize="3xl" as="b">
                  Sign in and start posting!
                </Text>
              </Flex>
            </CardBox>
            </Box>
          </>
        )}
        {session && <ListMyPosts />}
    </>
  );
}

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import CardBox from "./CardBox";
import EditUserForm from "./EditUserForm";
import React, { useState } from "react";
import SweetAlert2 from "react-sweetalert2";

export default function ProfileCard({ user, session }) {
  const handleEditProfile = () => {};
  const [swalProps, setSwalProps] = useState({});

  function handleClick() {
    setSwalProps({
      show: true,
      title: "Edit User Profile",
      showConfirmButton: false,
      onResolve: ()=>{setSwalProps({show: false})},
    });
  }

  return (
    <Center py={0}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        w={{ base: "80%", md: "70%" }}
        maxW={{ base: "100%", md: "600px" }}
        minW={{ base: "80%", md: "600px" }}
      >
        {/* <CardBox
        styles={{
          maxW: "270px",
          w: "full",
          bg: "white",
          boxShadow: "2xl",
          rounded: "md",
          overflow: "hidden",
        }}
      > */}
        <Image
          h={"160px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
          alt={"user cover picture"}
        />
        <Flex justify={"center"} mt={-16}>
          <Avatar
            size={"2xl"}
            src={user.image}
            css={{
              border: "2px solid white",
            }}
            referrerPolicy="no-referrer"
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {user.name}
            </Heading>
            <Text color={"gray.500"}>{`@${user.username}`}</Text>
            <Text color={"gray.500"}>{user.email}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
          </Stack>
          {(user.email === session?.user.email || session?.user.admin) && (
            <>
              <Button
                w={"full"}
                mt={8}
                bg={"gray.500"}
                // bg={useColorModeValue("#151f21", "gray.900")}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                variant="outline"
                onClick={handleClick}
              >
                Edit Profile
              </Button>
              <SweetAlert2 {...swalProps}>
                <EditUserForm user={user} session={session} />
              </SweetAlert2>
            </>
          )}
        </Box>
      </Box>
    </Center>
  );
}

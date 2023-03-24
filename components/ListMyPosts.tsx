import React, { useState, useEffect } from "react";
import {
  Box,
  Textarea,
  Text,
  Flex,
  Button,
  Spacer,
  HStack,
  SimpleGrid,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import CreatePostForm from "./CreatePostForm";
import CardBox from "@/components/CardBox";
import { useSession } from "next-auth/react";
import Logo from "./Logo";

const ListPosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchData() {
      console.log("waiting for response");
      setLoading(true);
      if (session) {
        // setLoading(true);
        console.log("waiting for response");
        const response = await axios.get("/api/posts?user=true");
        console.log(response);
        console.log(response);
        setData(response.data);
        // setLoading(false);
      }
      setLoading(false);
    }

    fetchData();
  }, [session]);

  const updatePosts = async (newPost) => {
    const response = await axios.get("/api/posts?user=true");
    setData(response.data);
  };

  return (
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
      {status === "unauthenticated" && (
        <CardBox>
          <Flex align="center" flexDirection="column" justifyContent="center">
            <Logo />
            <Text
              fontSize="3xl"
              as="b"
              textAlign="center"
              sx={{
                "@media screen and (max-width: 30em)": {
                  whiteSpace: "pre-wrap",
                  textAlign: "center",
                },
              }}
            >
              Sign in and start posting!
            </Text>
          </Flex>
        </CardBox>
      )}
      {status === "authenticated" && (
        <CardBox>
          <CreatePostForm updatePosts={updatePosts} />
        </CardBox>
      )}
      {loading && <Spinner size="xl" />}
      {session &&
        !loading &&
        data.map((item) => (
          <CardBox key={item.id}>
            <Flex justifyContent="space-between" alignItems="center">
              <Avatar
                size={"sm"}
                src={item.user.image}
                referrerPolicy="no-referrer"
              />
              <Text color={"gray.400"}>
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </Flex>
            <Text mt={4}>{item.content}</Text>
          </CardBox>
        ))}
        {data.length === 0 && !loading && status !== 'loading' && (
        <Flex align="center" py={{ base: 6 }} flexDirection="column">
          <Text color="gray">Wow, much empty</Text>
        </Flex>
      )}
      {/* {loading ? (
        <Spinner size="xl" />
      ) : (
        data.map((item) => (
          <CardBox key={item.id}>
            <Flex justifyContent="space-between" alignItems="center">
              <Avatar
                size={"sm"}
                src={item.user.image}
                referrerPolicy="no-referrer"
              />
              <Text color={"gray.400"}>
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </Flex>
            <Text mt={4}>{item.content}</Text>
          </CardBox>
        ))
      )}
      {data.length === 0 && !loading && (
        <Flex align="center" py={{ base: 6 }} flexDirection="column">
          <Text color="gray">Wow, much empty</Text>
        </Flex>
      )} */}
    </Flex>
  );
};

export default ListPosts;

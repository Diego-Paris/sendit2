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

const ListPosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      console.log("waiting for response")
      if (session) {
        setLoading(true);
        console.log("waiting for response")
        const response = await axios.get("/api/posts?user=true");
        console.log(response)
        console.log(response);
        setData(response.data);
        setLoading(false);
      }
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
      <CardBox>
        <CreatePostForm updatePosts={updatePosts} />
      </CardBox>
      {loading ? (
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
    </Flex>
  );
};

export default ListPosts;

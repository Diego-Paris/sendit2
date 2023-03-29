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

const ListPosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get("/api/posts");
      console.log(response);
      setData(response.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  const updatePosts = async (newPost) => {
    const response = await axios.get("/api/posts");
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
      minH={`calc(100vh - 73px)`}
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


// import { Formik, Field } from 'formik';
// import {
//   Box,
//   Button,
//   Checkbox,
//   Flex,
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   Input,
//   VStack,
// } from '@chakra-ui/react';

// export default function App() {
//   return (
//     <Flex
//       bg="gray.100"
//       align="flex-start"
//       justify="center"
//       h="100vh"
//       py={{ base: 6 }}
//     >
//       <Box bg="white" p={6} rounded="md" w={64}>
//         <Formik
//           initialValues={{
//             content: '',
//             password: '',
//             rememberMe: false,
//           }}
//           onSubmit={(values) => {
//             alert(JSON.stringify(values, null, 2));
//           }}
//         >
//           {({ handleSubmit, errors, touched }) => (
//             <form onSubmit={handleSubmit}>
//               <VStack spacing={4} align="flex-start">
//                 <FormControl>
//                   <FormLabel htmlFor="content">What is on your mind?</FormLabel>
//                   <Field
//                     as={Input}
//                     id="content"
//                     name="content"
//                     type="content"
//                     variant="filled"
//                   />
//                 </FormControl>
//                 <FormControl isInvalid={!!errors.password && touched.password}>
//                   <FormLabel htmlFor="password">Password</FormLabel>
//                   <Field
//                     as={Input}
//                     id="password"
//                     name="password"
//                     type="password"
//                     variant="filled"
//                     validate={(value) => {
//                       let error;

//                       if (value.length < 6) {
//                         error = 'Password must contain at least 6 characters';
//                       }

//                       return error;
//                     }}
//                   />
//                   <FormErrorMessage>{errors.password}</FormErrorMessage>
//                 </FormControl>
//                 <Field
//                   as={Checkbox}
//                   id="rememberMe"
//                   name="rememberMe"
//                   colorScheme="purple"
//                 >
//                   Remember me?
//                 </Field>
//                 <Button type="submit" colorScheme="purple" width="full">
//                   Login
//                 </Button>
//               </VStack>
//             </form>
//           )}
//         </Formik>
//       </Box>
//     </Flex>
//   );
// }

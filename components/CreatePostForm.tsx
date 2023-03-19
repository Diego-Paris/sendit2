import React, { useState } from "react";
import { Box, Textarea, Text, Flex, Button, useToast, Spinner } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import axios from "axios";
import { useSession } from "next-auth/react";

const CharacterCounter = ({ value, maxLength }) => {
  const remaining = maxLength - value.length;
  const color = remaining < 0 ? "red.500" : "gray.500";
  return (
    <Box mr={2} textAlign="left">
      <Text color={color} fontSize="sm">
        {remaining}/{maxLength}
      </Text>
    </Box>
  );
};

const CreatePostForm = ({ updatePosts }) => {
  const maxLength = 300;
  const minLength = 2;
  const { data: session } = useSession();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function fetchData(content: string) {
    try {
      const paylo = { content };
      const response = await axios.post("/api/posts", paylo);
      updatePosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (values, { resetForm }) => {
    // handle form submission logic here
    setIsSubmitting(true);
    console.log(values);
    if (values.text.length < minLength) {
      toast({
        title: `Your post must be at least ${minLength} characters long`,
        status: "error",
        isClosable: true,
        position: "top",
      });
      setIsSubmitting(false);
      return;
    }
    await fetchData(values.text);
    toast({
      title: `Your post has been uploaded`,
      status: "success",
      isClosable: true,
      position: "top",
    });
    resetForm();
    setIsSubmitting(false);
  };
  function validateLength(value) {
    let error;
    if (value.length < minLength) {
      error = `Your post must be at least ${minLength} characters long`;
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Formik initialValues={{ text: "" }} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Textarea
            name="text"
            value={values.text}
            onChange={handleChange}
            placeholder="Enter up to 300 characters..."
            maxLength={maxLength}
            mb={2}
            resize="none"
            size="sm"
            flex={1}
            isDisabled={!session}
            minLength={3}
          />
          <Flex justifyContent="space-between" alignItems="center">
            <CharacterCounter value={values.text} maxLength={maxLength} />
            {isSubmitting && <Spinner mt={4}/>}
            {!isSubmitting && (
              <Button type="submit" ml={2} isDisabled={!session}>
                Submit
              </Button>
            )}
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePostForm;

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

import React from 'react';
import { Box, Textarea, Text, Flex, Button } from '@chakra-ui/react';
import CreatePostForm from './CreatePostForm';

const ListPosts = () => {

  return (
    <Flex
      bg="gray.100"
      align="flex-start"
      justify="center"
      h="100vh"
      py={{ base: 6 }}
    >
      <Box bg="white" p={6} rounded="md" w={{ base: "80%", md: "70%"}} maxW={{ base: "100%", md: "600px" }}>
        <CreatePostForm/>
      </Box>
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

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const UserProfileEdit = ({ user, session, setSwalProps }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateUserData);
  const router = useRouter();
  const toast = useToast();
  const [newUsername, setNewUsername] = useState(user.username);
  const [usernameExists, setUsernameExists] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
    },
    onSubmit: (values) => {
      mutation.mutate({
        ...values,
        email: user.email, // Pass the current email as it shouldn't be updated
      });
    },
  });

  useEffect(() => {
    if (user) {
      console.log(user);
    }
    if (session) {
      console.log(session);
    }
    if (newUsername !== "") {
      setIsLoading(true);
      fetch(`/api/user/${newUsername}`)
        .then((response) => {
          if (response.status === 404) {
            console.log("does not exists");
            setUsernameExists(false);
          } else {
            setUsernameExists(true);
            console.log("does exists");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [user, session, newUsername]);

  function handleChange(event) {
    if (event.target.name === "username") {
      console.log(event.target.value);
      setNewUsername(event.target.value);
      console.log(newUsername);
    }
  }

  function updateUserData(updatedUser) {
    return fetch(`/api/user/${user.email}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.username !== user.username) {
          router.push(`/profile/${data.username}`);
        }

        return data;
      })
      .then(() => {
        toast({
          title: `User profile has been updated`,
          status: "success",
          isClosable: true,
          position: "top",
        });
        setSwalProps({ show: false });
        queryClient.invalidateQueries(["user", `${user.email}`]);
      })
      .catch((error) => {
        toast({
          title: `Could not update user, please try again later`,
          status: "error",
          isClosable: true,
          position: "top",
        });
        console.error("Error:", error);
      });
  }

  return (
    <Flex
      // minH={'100vh'}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        // rounded={'xl'}
        // boxShadow={'lg'}
        p={6}
        // my={12}
      >
        {/* <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading> */}
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={user?.image}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  isDisabled
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" isDisabled>
                Change Icon
              </Button>
            </Center>
          </Stack>
        </FormControl>
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" isRequired marginBottom={3}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              placeholder="Your Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl
            id="username"
            isInvalid={usernameExists && formik.dirty}
            isRequired
            marginBottom={3}
          >
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              placeholder="Username"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={formik.values.username}
              onChange={(event) => {
                formik.handleChange(event);
                handleChange(event);
              }}
            />
            {!isLoading && usernameExists &&  (
              <FormErrorMessage>Username is taken</FormErrorMessage>
            )}
            {isLoading && (
              <FormHelperText textAlign="left" color="grey.400">
                Checking availability
              </FormHelperText>
            )}
            {(!usernameExists || newUsername === user.username) &&
              !isLoading && (
                <FormHelperText textAlign="left" color="green.400">
                  Username is available
                </FormHelperText>
              )}
          </FormControl>
          <FormControl id="email" marginBottom={10}>
            <FormLabel>Email Address</FormLabel>
            <Input
              name="email"
              placeholder="Email Address"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              isDisabled
              bg="gray.200"
            />
            <FormHelperText color="gray.400">
              We&apos;ll never share your email with anyone else.
            </FormHelperText>
          </FormControl>
          <HStack justify="flex-end">
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={mutation.isLoading}
              w="full"
              marginBottom={0}
              isDisabled={!formik.dirty || !formik.isValid || usernameExists}
            >
              Save changes
            </Button>
          </HStack>
        </form>
        <Button
          colorScheme="purple"
          w="full"
          onClick={() => {
            setSwalProps({ show: false });
          }}
        >
          Return to profile
        </Button>
      </Stack>
    </Flex>
  );
};

export default UserProfileEdit;

// import {
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Stack,
//   useColorModeValue,
//   HStack,
//   Avatar,
//   AvatarBadge,
//   IconButton,
//   Center,
// } from '@chakra-ui/react';
// import { SmallCloseIcon } from '@chakra-ui/icons';
// import { useEffect } from 'react'

// export default function UserProfileEdit({ user, session }): JSX.Element {
//   useEffect(() => {
//     // Your code here
//     if (user) {
//       console.log(user)
//     }
//     if (session) {
//       console.log(session)
//     }
//   }, [user, session])

//   return (
//     <Flex
//       // minH={'100vh'}
//       align={'center'}
//       justify={'center'}
//       bg={useColorModeValue('white', 'gray.800')}>
//       <Stack
//         spacing={4}
//         w={'full'}
//         maxW={'md'}
//         bg={useColorModeValue('white', 'gray.700')}
//         // rounded={'xl'}
//         // boxShadow={'lg'}
//         p={6}
//         // my={12}
//         >
//         {/* <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
//           User Profile Edit
//         </Heading> */}
//         <FormControl id="userName">
//           <FormLabel>User Icon</FormLabel>
//           <Stack direction={['column', 'row']} spacing={6}>
//             <Center>
//               <Avatar size="xl" src="https://bit.ly/sage-adebayo">
//                 <AvatarBadge
//                   as={IconButton}
//                   size="sm"
//                   rounded="full"
//                   top="-10px"
//                   colorScheme="red"
//                   aria-label="remove Image"
//                   icon={<SmallCloseIcon />}
//                 />
//               </Avatar>
//             </Center>
//             <Center w="full">
//               <Button w="full">Change Icon</Button>
//             </Center>
//           </Stack>
//         </FormControl>
//         <FormControl id="name" isRequired>
//           <FormLabel>Name</FormLabel>
//           <Input
//           defaultValue={`${user.name}`}
//             placeholder="Your Name"
//             _placeholder={{ color: 'gray.500' }}
//             type="text"
//           />
//         </FormControl>
//         <FormControl id="userName" isRequired>
//           <FormLabel>Username</FormLabel>
//           <Input
//           defaultValue={`${user.username}`}
//             placeholder="Your Name"
//             _placeholder={{ color: 'gray.500' }}
//             type="text"
//           />
//         </FormControl>
//         <FormControl id="email" isRequired>
//           <FormLabel>Email address</FormLabel>
//           <Input
//             placeholder={`${user.email}`}
//             _placeholder={{ color: 'gray.500' }}
//             type="email"
//             // isReadOnly
//             // variant='filled'
//             // isDisabled
//             // color="red"
//             focusBorderColor="white"
//             bg="gray.200"
//             pointerEvents="none"
//             defaultValue={`${user.email}`}
//           />
//         </FormControl>
//         {/* <FormControl id="password" isRequired>
//           <FormLabel>Password</FormLabel>
//           <Input
//             placeholder="password"
//             _placeholder={{ color: 'gray.500' }}
//             type="password"
//           />
//         </FormControl> */}
//         <Stack spacing={6} direction={['column', 'row']}>
//           <Button
//             bg={'red.400'}
//             color={'white'}
//             w="full"
//             _hover={{
//               bg: 'red.500',
//             }}>
//             Cancel
//           </Button>
//           <Button
//             bg={'blue.400'}
//             color={'white'}
//             w="full"
//             _hover={{
//               bg: 'blue.500',
//             }}>
//             Submit
//           </Button>
//         </Stack>
//       </Stack>
//     </Flex>
//   );
// }

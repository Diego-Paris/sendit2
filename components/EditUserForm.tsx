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
  Text,
  Textarea,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import userValidationSchema from "@/validations/UserSchema";
import { Formik, Form, Field } from "formik";
const UserProfileEdit = ({ user, session, setSwalProps }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateUserData);
  const router = useRouter();
  const toast = useToast();
  const [newUsername, setNewUsername] = useState(user.username);
  const [usernameExists, setUsernameExists] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  useEffect(() => {
    if (user) {
      // setInitialValues({
      //   name: user?.name || "",
      //   username: user?.username || "",
      //   email: user?.email || "",
      // });
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
        <Formik
          initialValues={initialValues}
          validationSchema={userValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
            mutation.mutate({
              ...values,
              email: user.email, // Pass the current email as it shouldn't be updated
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid, dirty, errors, touched, values }) => (
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    // isInvalid={!!(errors.name)}
                    isRequired
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Name"
                      value={values.name}
                      // onChange={(e) => {
                      //   form.setFieldValue("name", e.target.value);
                      //   handleChange(e);
                      // }}
                    />
                    <FormHelperText textAlign="left" color="grey" mt={-0.2}>
                      - Name must be between 2 and 50 characters
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={!!(errors.username && touched.username)}
                    isRequired
                    mt={3}
                  >
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Username"
                      value={values.username}
                      onChange={(e) => {
                        form.setFieldValue("username", e.target.value);
                        handleChange(e);
                      }}
                    />
                    {!isLoading &&
                      usernameExists &&
                      newUsername !== user.username && (
                        <FormHelperText textAlign="left" color="red.400">
                          Username is not available
                        </FormHelperText>
                      )}
                    {isLoading && (
                      <FormHelperText textAlign="left" color="grey.400">
                        Checking availability
                      </FormHelperText>
                    )}
                    {!usernameExists &&
                      newUsername !== user.username &&
                      !isLoading && (
                        <FormHelperText textAlign="left" color="green.400">
                          Username is available
                        </FormHelperText>
                      )}
                    {newUsername === user.username && !isLoading && (
                      <FormHelperText textAlign="left" color="grey.500">
                        Username is not changed
                      </FormHelperText>
                    )}
                    <FormHelperText textAlign="left" color="grey" mt={-0.2}>
                      - Must be between 7 and 20 characters
                    </FormHelperText>
                    <FormHelperText textAlign="left" color="grey" mt={-0.2}>
                      - Cannot start with a number
                    </FormHelperText>
                    <FormHelperText textAlign="left" color="grey" mt={-0.2}>
                      - Can only contain letters, numbers or _
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field name="bio">
                {({ field, form }) => (
                  <FormControl
                  mt={3}
                  >
                    <FormLabel htmlFor="bio">Bio</FormLabel>
                    <Textarea
                      {...field}
                      id="bio"
                      placeholder="Write about yourself..."
                      value={values.bio}
                      resize="none"
                      onChange={(e) => {
                        form.setFieldValue("bio", e.target.value);
                        handleChange(e);
                      }}
                    />
                    <FormHelperText textAlign="left" color="grey" mt={-0.2}>
                      - Bio can be upto 50 characters long
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={!!(errors.email && touched.email)}
                    // isRequired
                    mt={3}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      isDisabled
                    />
                    <FormHelperText color="gray.400">
                      We&apos;ll never share your email with anyone else.
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <HStack
                mt={8}
                spacing={4}
                direction="row"
                wrap="wrap"
                align="center"
                justify="center"
              >
                <Button
                  onClick={() => {
                    setSwalProps({ show: false });
                  }}
                >
                  Return to Profile
                </Button>
                <Button
                  colorScheme="teal"
                  isLoading={mutation.isLoading}
                  type="submit"
                  isDisabled={
                    !dirty ||
                    !isValid ||
                    (usernameExists && newUsername !== user.username) ||
                    isLoading ||
                    (initialValues.name === values.name &&
                      initialValues.username === values.username &&
                      initialValues.email === values.email &&
                      initialValues.bio === values.bio)
                  }
                >
                  Submit
                </Button>
              </HStack>
              {Object.keys(errors).length > 0 && (
                <div>
                  {Object.keys(errors).map((fieldName) => (
                    <Text mt={4} color={"red.400"} key={fieldName}>
                      {errors[fieldName]}
                    </Text>
                  ))}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
};

export default UserProfileEdit;

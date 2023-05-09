import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import NextAuth from '../pages/api/auth/[...nextauth]';
import { getServerSideProps } from '../pages/signin';
import { FcGoogle } from 'react-icons/fc';
import PageWrapper from './PageWrapper';
import CardBox from './CardBox';

export default function SignInCard({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    // <Flex
    //   minH={'100vh'}
    //   align={'center'}
    //   justify={'center'}
    //   bg={useColorModeValue('gray.50', 'gray.800')}
    // >
      <Flex
      bg="gray.100"
      align="center"
      py={{ base: 6 }}
      flexDirection="column"
      gap="6"
      h="auto"
      minH={`calc(100vh - 73px)`}
      flexGrow={1}
      justify='center'
    >
      <CardBox styles={{ boxShadow: 'lg' }}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            and start posting! ✌️
          </Text>
        </Stack>
        <Box
          // rounded={'lg'}
          // bg={useColorModeValue('gray.100', 'gray.700')}
          // boxShadow={'lg'}
          // p={8}
        >
          <Stack spacing={4}>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  {/* <button onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                  </button> */}
                  {provider.id == 'google' && (
                    <Button
                      w={'full'}
                      variant={'outline'}
                      colorScheme='teal'
                      leftIcon={<FcGoogle />}
                      onClick={() => signIn(provider.id)}
                    >
                      <Center>
                        <Text>Sign in with Google</Text>
                      </Center>
                    </Button>
                  )}
                </div>
              ))}
            {/* <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack> */}
          </Stack>
        </Box>
      </Stack>

    {/* </Flex> */}
    </CardBox>
    </Flex>
  );
}

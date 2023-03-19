import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders, getSession } from 'next-auth/react';
import SignInCard from '../../components/SignInCard';
import NextAuth from '../api/auth/[...nextauth]';

export default function SignInPage({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <SignInCard providers={providers}/>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
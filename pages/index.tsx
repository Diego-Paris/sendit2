import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import ListPosts from "../components/ListPosts";

const Home: NextPage = () => {
  return (
    <>
      <ListPosts />
      <HeroSection />
      <Features />
      <Testimonials />
      {/* <Head>
        <title>Next Nest Boilerplate</title>
      </Head>
      <Header />
      <Layout>
        <Box css={{ marginBottom: '20px' }}>
          <h1>Next-Nest Boilerplate</h1>
          <ul style={{ marginLeft: '20px' }}>
            <li>Next.js</li>
            <li>Nest.js</li>
            <li>Prisma ORM + Postgres</li>
            <li>Next-Auth</li>
            <li>Stitches</li>
            <li>Formik + Yup</li>
            <li>Avvvatars</li>
          </ul>
        </Box>
        <h2>Pages:</h2>
        <P>
          <Link href="/account">Account [protected]</Link>
          <br />
          <Link href="/about">About [public]</Link>
        </P>
        <h2>Apis:</h2>
        <P>
          <Link href="/api/app/protected">api/protected</Link>
          <br />
          <Link href="/api/app/hello">api/hello</Link>
        </P>
      </Layout> */}
    </>
  );
};

export default Home;

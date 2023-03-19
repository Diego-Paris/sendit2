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
    </>
  );
};

export default Home;

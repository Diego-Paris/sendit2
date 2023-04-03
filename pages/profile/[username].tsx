import { useRouter } from "next/router";
import PageWrapper from "@/components/PageWrapper";
import ProfileCard from "@/components/ProfileCard";
import { getSession, useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import NotFoundPage from "@/components/NotFoundPage";

export default function ProfilePage({ username, session }) {
  const router = useRouter();
  const [user, setUser] = useState<Partial<User>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/user/${username}`);

        if (!res.ok) {
          setUser({
            email: "@@@",
          });
          return;
        }

        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        setUser({
          email: "@@@",
        });
      }
    }
    fetchData();
    
  }, [username]);

  const { data, isLoading, isError, error } = useQuery(
    ["user", user.email],
    async () => {
      const res = await fetch(`/api/user/${user.email}`);
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message);
      }  
      return res.json();
    },
    {
      cacheTime: 0,
      enabled: !!user?.email,
      refetchInterval: () => {
        return 1000;
      },
      onError: (err: Error) => err,
      retry: (failureCount, error) => {
        console.log("HEYOOO",error.message)
        if (error?.message === 'User not found') {
          console.log("inside")
          return false;
        }
        console.log("outside")

        return false;
      },
    }
  );

  if (isLoading) {
    return (
      <>
        <PageWrapper>
          <Loading />
        </PageWrapper>
      </>
    );
  }

  if (isError) {
    // Handle the 404 error by redirecting to a custom 404 page
    if (error.message === "User not found") {
      router.push(`/profiIe/${username}`); // This is such a hack...
      // setUser({
      //   email: "",
      // });
      return <NotFoundPage />;
    }
    // Handle other errors by displaying an error message
    else {
      return (
        <>
          <PageWrapper>
            <p>An error occurred: {error.message}</p>
          </PageWrapper>
        </>
      );
    }
  }

  return (
    <>
      <PageWrapper>
        <ProfileCard user={data} session={session} />
      </PageWrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.params;
  const session = await getSession(context);

  // const res = await fetch(`http://localhost:3000/api/user/${username}`);
  // const user = await res.json();
  return {
    props: {
      username,
      session,
    },
  };
}

// async function fetchUserByUsername(username: string): Promise<User> {
//   const res = await fetch(`/api/user/${username}`);
//   return res.json();
// }

// const UserProfile = () => {
//   const router = useRouter();
//   const { usernameFromUrl } = router.query;
//   const username = Array.isArray(usernameFromUrl)
//     ? usernameFromUrl[0]
//     : usernameFromUrl;
//   const { data: session } = useSession();
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["userProfile"],
//     queryFn: () => fetchUserByUsername(username),
//   });

//   if (isLoading) {
//     return (
//       <>
//         <p>Is loading...</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <PageWrapper>
//         {!session ? <p>asd</p> : <ProfileCard username={username} />}
//       </PageWrapper>
//     </>
//   );
// };

// export default UserProfile;

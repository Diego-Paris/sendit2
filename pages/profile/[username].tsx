import { useRouter } from "next/router";
import PageWrapper from "@/components/PageWrapper";
import ProfileCard from "@/components/ProfileCard";
import { getSession, useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Loading from "@/components/Loading";

export default function ProfilePage({ user, session }) {
  const { data, isLoading } = useQuery(
    ["user", user.email],
    () => fetch(`/api/user/${user.username}`).then((res) => res.json()),
    {
      refetchInterval: () => {
        return 1000
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

  const res = await fetch(`http://localhost:3000/api/user/${username}`);
  const user = await res.json();
  return {
    props: {
      user,
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

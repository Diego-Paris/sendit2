import { getSession, useSession } from "next-auth/react";
import ProfileCard from "../../components/ProfileCard";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import PageWrapper from "@/components/PageWrapper";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/profile/${session.user.username}`);
    }
  }, [session, router]);

  // if (session) {
  //   redirect(`/profile/${session.user.username}`);
  // }

  return (
    <>
      <PageWrapper>
        <Loading />
      </PageWrapper>
    </>
  );
}

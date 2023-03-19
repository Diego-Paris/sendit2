import { getSession, useSession } from 'next-auth/react'
import ProfileCard from '../../components/ProfileCard';

export default function ProfilePage() {
  const { data: session } = useSession()
  
  return (
    <>
      {!session ? <h1>Access denied</h1> : (
        <ProfileCard />
      )}
    </>
  );
}

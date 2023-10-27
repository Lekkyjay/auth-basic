import UserInfo from '@/components/UserInfo'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions)  

  return (
    <div className="grid place-items-center h-screen -mt-24">
      <UserInfo />
      <div>
        <h1>GetServerSession Data</h1>
        <p>Name: {session?.user?.name}</p>
        <p>Email: {session?.user?.email}</p>
      </div>
    </div>
  )
}

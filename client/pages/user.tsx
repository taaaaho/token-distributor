import { UserInterface } from '@/types/UserInterface'
import { getSession, GetSessionParams, signOut } from 'next-auth/react'
import MoralisType from 'moralis-v1'

// gets a prop from getServerSideProps
const User: React.FC<MoralisType.User> = (user) => {
  return (
    <div>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context)

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { user: session.user },
  }
}

export default User

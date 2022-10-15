import { getSession, GetSessionParams, signOut } from 'next-auth/react'
import { Context } from 'react'

interface UserInterface {
  address: string
  profileId: string
  expirationTime: string
  signature: string
}
// gets a prop from getServerSideProps
const User: React.FC<UserInterface> = (user) => {
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

import { User } from '@/types/User'
import { useSession } from 'next-auth/react'

export const useMoralisSession = (): {
  user: User
} => {
  const { data: session } = useSession()
  const user = session?.user as User
  return { user }
}

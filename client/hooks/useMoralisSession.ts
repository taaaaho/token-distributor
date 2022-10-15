import { UserInterface } from '@/types/UserInterface'
import { useSession } from 'next-auth/react'

export const useMoralisSession = (): {
  user: UserInterface
} => {
  const { data: session } = useSession()
  const user = session?.user as UserInterface
  return { user }
}

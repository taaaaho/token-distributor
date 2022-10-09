import { Users } from '@/component/Users'
import { CommonLayout } from '@/layouts/CommonLayout'
import { Box, Button, Center, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession()

  return (
    <>
    <Button colorScheme="purple">Push Me</Button>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default Home

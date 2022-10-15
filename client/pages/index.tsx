import { TokenAllocators } from '@/component/TokenAllocators'
import SignIn from '@/component/SignIn'
import { useMoralisSession } from '@/hooks/useMoralisSession'
import { CommonLayout } from '@/layouts/CommonLayout'
import { Center, Text } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const { user } = useMoralisSession()

  if (user) {
    return (
      <Center height="100%" alignItems="start" my="2">
        <TokenAllocators />
      </Center>
    )
  }

  return (
    <Center height="100%" alignItems="start" my="2">
      <SignIn />
    </Center>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default Home

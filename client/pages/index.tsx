import SignIn from '@/component/SignIn'
import { useMoralisSession } from '@/hooks/useMoralisSession'
import { CommonLayout } from '@/layouts/CommonLayout'
import { Center, Text } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  // const { user } = useMoralisSession()

  return (
    <Center height="100vh">
      <SignIn />
    </Center>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default Home

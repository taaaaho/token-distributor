import { TokenAllocators } from '@/component/TokenAllocators'
import SignIn from '@/component/SignIn'
import { useMoralisSession } from '@/hooks/useMoralisSession'
import { CommonLayout } from '@/layouts/CommonLayout'
import { Center, Text, VStack } from '@chakra-ui/react'
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
    <Center height="100%" my={24}>
      <VStack gap={12}>
        <Text
          fontSize={{ base: '5xl', md: '8xl' }}
          fontWeight="bold"
          lineHeight={{ base: '65px', md: '90px' }}
          textAlign="center"
        >
          TOKEN <br />
          DISTRIBUTOR
        </Text>
        <SignIn buttonSize="lg" />
      </VStack>
    </Center>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default Home

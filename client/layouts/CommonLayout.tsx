import { Header } from '@/component/Header'
import { Loading } from '@/component/Loading'
import { useAppContext } from '@/context/AppContext'
import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import type { ReactElement } from 'react'

const Layout = ({ children }: { children: ReactElement }) => {
  const { isLoading } = useAppContext()
  return (
    <Box minH="100vh" pt="24" bgColor="black">
      <Head>
        <title>Token Distributor</title>
        <meta property="og:title" content="Token Distributor" key="title" />
      </Head>
      <Header />
      {isLoading && <Loading />}
      <Box color="white">{children}</Box>
    </Box>
  )
}

export { Layout as CommonLayout }

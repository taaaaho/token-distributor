import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect, useState } from 'react'

// Authentication
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import AppProvider, { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/router'
import { Loading } from '@/component/Loading'

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
})

// Page Layout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout
  session: Session
}

// Main
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { setIsLoading } = useAppContext()

  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)
  useEffect(() => {
    const handleStart = (url: any) =>
      url !== router.asPath && setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={session} refetchInterval={0}>
        <AppProvider>
          <ChakraProvider>
            {pageLoading && <Loading />}
            {getLayout(<Component {...pageProps} />)}
          </ChakraProvider>
        </AppProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}

export default MyApp

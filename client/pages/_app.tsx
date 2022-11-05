import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { ReactElement, useEffect, useState } from 'react'

// Authentication
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import AppProvider from '@/context/AppContext'
import { TransitionLoading } from '@/component/TransitionLoading'

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

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={session} refetchInterval={0}>
        <AppProvider>
          <ChakraProvider>
            <TransitionLoading />
            {getLayout(<Component {...pageProps} />)}
          </ChakraProvider>
        </AppProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}

export default MyApp

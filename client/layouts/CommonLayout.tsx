import { Header } from '@/component/Header'
import { Box } from '@chakra-ui/react'
import type { ReactElement } from 'react'

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <Box minH="100vh" position="relative" pt="24" bgColor="black">
      <Header />
      <Box color="white">{children}</Box>
    </Box>
  )
}

export { Layout as CommonLayout }

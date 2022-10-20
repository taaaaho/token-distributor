import { Box, Button, Center, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import type { ReactElement } from 'react'

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <Box minH="100%" position="relative" pt={18} bgColor="black">
      <Box
        backgroundImage={'LP/back.jpg'}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundColor="black"
      >
        <HStack
          position="fixed"
          width="100%"
          top="0"
          py="4"
          px={{ base: '6', md: '10' }}
          justifyContent="space-between"
          bgColor="#010101"
          zIndex={1}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: 'xl', md: '2xl' }}
            color="#fafafa"
          >
            TOKEN DISTRIBUTOR
          </Text>
          <Button color="#010101" size="md">
            <Link href="https://app.token-distributor.xyz/">Launch App</Link>
          </Button>
        </HStack>
        <Box
          color="#fafafa"
          bg="rgba(0,0,0,0.5)"
          pt={6}
          pb={{ base: 24, md: 96 }}
        >
          {children}
        </Box>
      </Box>
      <Center
        width="100%"
        bottom="0"
        bgColor="#010101"
        height="60px"
        color="#fafafa"
      >
        <HStack>
          <Text>Copyright © 2022</Text>
          <Link href="https://twitter.com/crypto_inuuu">{` Crypto INU `}</Link>
          <Text>All rights reserved.</Text>
        </HStack>
      </Center>
    </Box>
  )
}

export { Layout as LPLayout }

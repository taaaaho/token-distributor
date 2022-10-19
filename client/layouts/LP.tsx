import { Box, Button, Center, HStack, Text } from '@chakra-ui/react'
import type { ReactElement } from 'react'

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <Box minH="100%" position="relative" pt={20} bgColor="black">
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
          bgColor="black"
          zIndex={1}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: 'xl', md: '2xl' }}
            color="white"
          >
            TOKEN DISTRIBUTOR
          </Text>
          <Button bgColor="black" size="md" color="white">
            Launch App
          </Button>
        </HStack>
        <Box
          color="white"
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
        bgColor="blackAlpha.900"
        height="60px"
        color="white"
      >
        © 2022 Crypto INU
      </Center>
    </Box>
  )
}

export { Layout as LPLayout }

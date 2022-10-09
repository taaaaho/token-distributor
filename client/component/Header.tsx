import { Box, Button, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/react'

export const Header: React.FC = () => {
  const { data: session } = useSession()
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      position="fixed"
      width="100vw"
      top="0"
      py="3"
      px={{ base: '2', md: '8' }}
      justifyContent="space-between"
      bgColor="black"
    >
      <Box width="100vw">
        <HStack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontWeight="bold" fontSize="2xl" color="white">
            WHITELIST MANAGER
          </Text>
          <Spacer />
          {session && (
            <>
              <Text pr="4" color="white">
                {session?.user?.email}
              </Text>
              <Button size="sm" colorScheme="purple" onClick={() => signOut()}>
                Sign out
              </Button>
            </>
          )}
        </HStack>
      </Box>

      {/* <Box
        bg="gray.800"
        borderRadius="xl"
        m="2"
        px="3"
        py="2"
        display={{ base: 'none', md: 'block' }}
      >
        <Text
          fontWeight="semibold"
          fontSize={{ base: 'xs', md: 'sm' }}
          color="white"
        >
          Connect Wallet
        </Text>
      </Box> */}
    </Flex>
  )
}

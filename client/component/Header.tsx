import { useMoralisSession } from '@/hooks/useMoralisSession'
import { getEllipsisTxt } from '@/utils/format'
import { Box, Button, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import SignIn from './SignIn'

export const Header: React.FC = () => {
  const { user } = useMoralisSession()
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
      zIndex={1}
    >
      <Box width="100vw">
        <HStack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="/">
            <Text
              fontWeight="bold"
              fontSize={{ base: 'xl', md: '2xl' }}
              color="white"
            >
              TOKEN ALLOCATOR
            </Text>
          </Link>
          <Spacer />
          {user ? (
            <>
              <Text color="white">{getEllipsisTxt(user.address)}</Text>
              <Button
                size="sm"
                colorScheme="purple"
                onClick={() => signOut({ redirect: false })}
              >
                Sign out
              </Button>
            </>
          ) : (
            <SignIn />
          )}
        </HStack>
      </Box>
    </Flex>
  )
}

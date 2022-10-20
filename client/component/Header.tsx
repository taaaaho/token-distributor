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
      px={{ base: '4', md: '8' }}
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
              TOKEN DISTRIBUTOR
            </Text>
          </Link>
          <Spacer />
          {user ? (
            <>
              <Text color="white">{getEllipsisTxt(user.address, 4)}</Text>
              <Button
                size="sm"
                color="#010101"
                onClick={() => signOut({ redirect: false })}
              >
                SignOut
              </Button>
            </>
          ) : (
            <SignIn buttonSize="md" />
          )}
        </HStack>
      </Box>
    </Flex>
  )
}

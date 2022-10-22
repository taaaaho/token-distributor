import { useMoralisSession } from '@/hooks/useMoralisSession'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import SignIn from './SignIn'
import { WalletMenu } from './WalletMenu'

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
        <Flex
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
              <WalletMenu />
            </>
          ) : (
            <SignIn buttonSize="md" />
          )}
        </Flex>
      </Box>
    </Flex>
  )
}

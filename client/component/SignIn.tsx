import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { signIn } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Box, Button } from '@chakra-ui/react'

const SignIn = () => {
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync()
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    })

    const userData = { address: account, chain: chain.id, network: 'evm' }

    const { data } = await axios.post('/api/auth/request-message', userData, {
      headers: {
        'content-type': 'application/json',
      },
    })

    const message = data.message

    const signature = await signMessageAsync({ message })

    // redirect user after success authentication to '/user' page
    await signIn('credentials', {
      message,
      signature,
      redirect: false,
    })
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    // push('/user')
  }

  return (
    <Box>
      <Button size="sm" colorScheme="blue" onClick={() => handleAuth()}>
        SignIn
      </Button>
    </Box>
  )
}

export default SignIn

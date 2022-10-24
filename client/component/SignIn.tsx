import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { signIn } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
import axios from 'axios'
import { Box, Button, Text } from '@chakra-ui/react'
import Image from 'next/image'

interface Props {
  buttonSize: string
}

const SignIn: React.FC<Props> = (props) => {
  const { buttonSize = 'md' } = props
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

    await signIn('credentials', {
      message,
      signature,
      redirect: false,
    })
  }

  return (
    <Box>
      <Button size={buttonSize} color="#010101" onClick={() => handleAuth()}>
        <Text mr={2}>SignIn</Text>
        <Image
          src="/metamask.svg"
          width="25px"
          height="25px"
          alt="metamask icon"
        />
      </Button>
    </Box>
  )
}

export default SignIn

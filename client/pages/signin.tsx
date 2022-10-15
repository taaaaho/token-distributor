import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { signIn } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
import { useRouter } from 'next/router'
import axios from 'axios'

function SignIn() {
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync()
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    })

    const userData = { address: account, chain: chain.id, network: 'evm' }
    console.log(userData)

    const { data } = await axios.post('/api/auth/request-message', userData, {
      headers: {
        'content-type': 'application/json',
      },
    })

    const message = data.message
    console.log('message', message)

    const signature = await signMessageAsync({ message })
    console.log('signature', signature)

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
    push('/user')
  }

  return (
    <div>
      <h3>Web3 Authentication</h3>
      <button onClick={() => handleAuth()}>Authenticate via Metamask</button>
    </div>
  )
}

export default SignIn

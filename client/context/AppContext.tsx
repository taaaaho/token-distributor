// import { ethers } from 'ethers'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type Context = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  // provider: ethers.providers.Web3Provider | undefined
  // setProvider: Dispatch<
  //   SetStateAction<ethers.providers.Web3Provider | undefined>
  // >
}
const AppContext = createContext({} as Context)

type Props = {
  children: ReactNode
}

const AppProvider: React.FC<Props> = (props) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  {
    return (
      <AppContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
      </AppContext.Provider>
    )
  }
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export default AppProvider

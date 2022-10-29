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
}
const AppContext = createContext({} as Context)

type Props = {
  children: ReactNode
}

const AppProvider: React.FC<Props> = (props) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

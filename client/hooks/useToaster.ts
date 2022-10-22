import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useToaster = () => {
  const toast = useToast()
  const errorToast = useCallback(
    (errorCode: string) => {
      toast({
        title: 'Error',
        description: errorCode,
        status: 'error',
        position: 'top',
        duration: 7000,
        isClosable: true,
      })
    },
    [toast]
  )

  const successToast = useCallback(
    (message: string) => {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        position: 'top',
        duration: 7000,
        isClosable: true,
      })
    },
    [toast]
  )

  const infoToast = useCallback(
    (message: string) => {
      toast({
        title: message,
        status: 'info',
        position: 'top',
        isClosable: true,
      })
    },
    [toast]
  )
  return { errorToast, successToast, infoToast }
}

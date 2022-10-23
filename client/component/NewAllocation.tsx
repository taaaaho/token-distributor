import React, { useEffect, useState } from 'react'
import {
  Box,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Allocation } from '@prisma/client'

import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { ethers } from 'ethers'

interface Props {
  ind: number
  seq: string
  allocations: Pick<Allocation, 'id' | 'wallet' | 'proportion'>[]
  deleteAllocation: (deleteId: string) => void
  setAllocations: React.Dispatch<
    React.SetStateAction<Pick<Allocation, 'id' | 'wallet' | 'proportion'>[]>
  >
}
export const NewAllocation: React.FC<Props> = (props) => {
  const { ind, seq, allocations, setAllocations, deleteAllocation } = props
  const [wallet, setWallet] = useState<string>('')
  const [proportion, setProportion] = useState<number>(1)

  const [isProportionError, setIsProportionError] = useState<boolean>(false)
  const [isInvalidAddressError, setIsInvalidAddressError] =
    useState<boolean>(false)

  const handledeleteAllocation = () => {
    deleteAllocation(seq)
  }
  useEffect(() => {
    setIsInvalidAddressError(false)
    setIsProportionError(false)
    if (proportion < 0 || proportion > 99) {
      setIsProportionError(true)
    }
    if (wallet === '' || !ethers.utils.isAddress(wallet)) {
      setIsInvalidAddressError(true)
    }
    if (wallet && proportion) {
      const tempAllocations = [...allocations]
      tempAllocations[ind] = { id: seq, wallet, proportion }
      setAllocations(tempAllocations)
    }
  }, [wallet, proportion])

  return (
    <Box mt="3">
      <HStack w="100%" alignItems="flex-start">
        <FormControl isRequired isInvalid={isInvalidAddressError}>
          <FormLabel>Wallet {ind}</FormLabel>
          <Input
            placeholder="Wallet Address"
            onChange={(e) => setWallet(e.target.value)}
          />
          <FormErrorMessage>
            Wallet must be entered and the format must be correct.
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={isProportionError} width="110px">
          <FormLabel>Proporsion</FormLabel>
          <NumberInput
            max={99}
            min={1}
            defaultValue={1}
            onChange={(_, valueAsNumber) => setProportion(valueAsNumber)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>
            The proportion must be specified from 1 to 99.
          </FormErrorMessage>
        </FormControl>
        <Box mt="40px">
          <DeleteIcon onClick={handledeleteAllocation} />
        </Box>
      </HStack>
    </Box>
  )
}

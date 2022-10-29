import React, { useState } from 'react'
import { Button, Divider, HStack, Input, Stack } from '@chakra-ui/react'

import artifact from '@/abi/TokenDistributor.json'

import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { useMoralisSession } from '@/hooks/useMoralisSession'
import { NewAllocation } from './NewAllocation'
import { Allocation, TokenAllocator } from '@prisma/client'
import { ethers } from 'ethers'
import axios from 'axios'
import { useToaster } from '@/hooks/useToaster'
import { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/router'

export const NewTokenAllocators = () => {
  const { user } = useMoralisSession()
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [allocations, setAllocations] = useState<
    Pick<Allocation, 'id' | 'wallet' | 'proportion'>[]
  >([])
  const [counter, setCounter] = useState(0)

  const [isNameError, setIsNameError] = useState<boolean>(false)
  const [isProportionError, setIsProportionError] = useState<boolean>(false)
  const [isInvalidAddressError, setIsInvalidAddressError] =
    useState<boolean>(false)

  const { setIsLoading } = useAppContext()
  const { errorToast, successToast } = useToaster()

  const addAllocation = () => {
    setCounter(counter + 1)
    const newAllocation = {
      id: String(counter),
      wallet: '',
      proportion: 1,
    }
    const tempAllocations = [...allocations, newAllocation]
    setAllocations(tempAllocations)
  }

  const deleteAllocation = (deleteId: string) => {
    const tempAllocations = [...allocations]
    setAllocations(
      tempAllocations.filter((allocation) => allocation.id != deleteId)
    )
  }

  const validationInput = (): boolean => {
    setIsNameError(false)
    setIsProportionError(false)
    setIsInvalidAddressError(false)
    if (name.trim() == '') {
      setIsNameError(true)
      return false
    }

    // Proportion Validation
    const totalProportion = allocations.reduce((sum, allocation) => {
      return sum + allocation.proportion
    }, 0)
    if (totalProportion !== 100) {
      setIsProportionError(true)
      return false
    }

    // Wallet Validation
    const invalidAddress = allocations.filter(
      (allocation) => !ethers.utils.isAddress(allocation.wallet)
    )
    if (invalidAddress.length > 0) {
      setIsInvalidAddressError(true)
      return false
    }
    return true
  }
  const postTokenAllocators = async () => {
    setIsLoading(true)
    try {
      if (!user) {
        errorToast('Please Signin')
        return
      }
      // validation
      if (!validationInput()) {
        return
      }
      if (isNameError || isProportionError || isProportionError) {
        return
      }

      // contract deploy
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
        'any'
      )

      const signer = provider.getSigner()
      const factory = new ethers.ContractFactory(
        artifact.abi,
        artifact.bytecode,
        signer
      )

      let wallets = allocations.map((allocation) => allocation.wallet)
      const argsWallets = wallets.map((wallet) =>
        ethers.utils.hexZeroPad(wallet, 32)
      )

      let proportions = allocations.map((allocation) => allocation.proportion)
      const argsProportions = proportions.map((proportion) =>
        ethers.utils.hexZeroPad(
          ethers.BigNumber.from(proportion).toHexString(),
          32
        )
      )

      let contract = await factory.deploy(argsWallets, argsProportions)
      const cont = await contract.deployed()

      const network = await provider.getNetwork()
      // @ts-ignore
      allocations.map((allocation) => delete allocation.id)
      // create data
      const data = {
        name,
        description,
        network: network.name,
        owner: user.address,
        contract: contract.address,
        allocations,
      }
      const res = await axios.post<TokenAllocator[]>(
        `${window.origin}/api/tokenAllocators`,
        data
      )
      setAllocations([])
      successToast('Contract is created')
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Stack w="100%" px={{ base: 4, md: 12 }}>
      <FormControl isRequired isInvalid={isNameError}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Allocation Name"
          onChange={(e) => setName(e.target.value)}
        />
        <FormErrorMessage>Name is required.</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          placeholder="Allocation Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <Divider mt="3" />
      {allocations.map((allocation, index) => (
        <NewAllocation
          key={index}
          ind={index}
          seq={allocation.id}
          allocations={allocations}
          deleteAllocation={deleteAllocation}
          setAllocations={setAllocations}
        />
      ))}
      <HStack justifyContent="space-between" alignItems="flex-start" mt="4">
        <Button color="#010101" onClick={addAllocation} w="200px">
          Add Allocation
        </Button>
        <FormControl
          isInvalid={isProportionError || isInvalidAddressError}
          textAlign="right"
        >
          <Button
            color="#010101"
            onClick={postTokenAllocators}
            textAlign="right"
          >
            CREATE
          </Button>
          <FormErrorMessage justifyContent="right">
            The total proportion must be 100.
          </FormErrorMessage>
        </FormControl>
      </HStack>
    </Stack>
  )
}

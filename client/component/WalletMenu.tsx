import { useMoralisSession } from '@/hooks/useMoralisSession'
import { capitalize, getEllipsisTxt } from '@/utils/format'
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

import { ChevronDownIcon, CopyIcon } from '@chakra-ui/icons'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import {
  CHAIN_LIST,
  ETHERIUM_CHAIN_ID,
  GOERLI_CHAIN_ID,
  MATIC_CHAIN_ID,
  MATIC_TEST_CHAIN_ID,
  BNB_CHAIN_ID,
  BNB_TEST_CHAIN_ID,
} from '@/types/Chain'
import { copyTextToClipboard } from '@/utils/copy'
import { useToaster } from '@/hooks/useToaster'
import { useAppContext } from '@/context/AppContext'

export const WalletMenu: React.FC = () => {
  const { user } = useMoralisSession()
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  const [network, setNetwork] = useState<string>()
  const [balance, setBalance] = useState<string>()

  const { setIsLoading } = useAppContext()

  const { infoToast } = useToaster()
  const { onOpen, onClose, isOpen } = useDisclosure()

  const loadProvider = () => {
    const newProvider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    )
    if (newProvider) {
      setProvider(newProvider)
    }
  }
  const changeNetwork = async (chainId: string) => {
    setIsLoading(true)
    if (provider) {
      try {
        await provider.send('wallet_switchEthereumChain', [
          { chainId: chainId },
        ])
        loadProvider()
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.send('wallet_addEthereumChain', [
              // @ts-ignore
              CHAIN_LIST[chainId],
            ])
            loadProvider()
          } catch (addError) {
            console.error(addError)
            // handle "add" error
          }
        }
        // handle other "switch" errors
      } finally {
        setIsLoading(false)
      }
    }
  }
  const fetchData = useCallback(async () => {
    if (provider) {
      const network = await provider.getNetwork()
      setNetwork(network.name)

      if (user) {
        const balance = await provider.getBalance(user.address)
        setBalance(ethers.utils.formatEther(balance))
      }
    }
  }, [provider, user])

  useEffect(() => {
    if (provider) {
      fetchData()
    }
  }, [fetchData, provider])

  useEffect(() => {
    loadProvider()
  }, [])

  return (
    <>
      <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <Button size="sm" color="#010101">
            <Text mr={2}>{getEllipsisTxt(user.address, 4)}</Text>
            <Image
              src="/metamask.svg"
              width="25px"
              height="25px"
              alt="metamask icon"
            />
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        {provider && (
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <HStack gap={2}>
                <span>{capitalize(network)}</span>
                <span>{balance?.slice(0, 6)} ETH</span>
              </HStack>
              <Text
                fontSize="xs"
                onClick={async () => {
                  const res = await copyTextToClipboard(user.address)
                  if (res) {
                    infoToast('Copied!')
                  }
                }}
                cursor="pointer"
              >
                {getEllipsisTxt(user.address, 10)}
                <CopyIcon />
              </Text>
            </PopoverHeader>
            <PopoverBody>
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    width="full"
                    rightIcon={<ChevronDownIcon />}
                    bgColor="black"
                    color="white"
                  >
                    Change Network
                  </MenuButton>
                  <MenuList>
                    <Text ml={1} fontWeight="semibold">
                      Mainnet
                    </Text>
                    <MenuItem
                      onClick={() => {
                        changeNetwork(ETHERIUM_CHAIN_ID)
                        onClose()
                      }}
                    >
                      Etherium
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        changeNetwork(MATIC_CHAIN_ID)
                        onClose()
                      }}
                    >
                      Polygon
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        changeNetwork(BNB_CHAIN_ID)
                        onClose()
                      }}
                    >
                      Binance Smart Chain
                    </MenuItem>
                    <MenuDivider />
                    <Text ml={1} fontWeight="semibold">
                      Testnet
                    </Text>
                    <MenuItem
                      onClick={() => {
                        changeNetwork(GOERLI_CHAIN_ID)
                        onClose()
                      }}
                    >
                      Goerli
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        changeNetwork(MATIC_TEST_CHAIN_ID)
                        onClose()
                      }}
                    >
                      Mumbai
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        changeNetwork(BNB_TEST_CHAIN_ID)
                        onClose()
                      }}
                    >
                      Binance Smart Chain Test
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Button
                mt={2}
                size="md"
                width="full"
                bgColor="black"
                colorScheme="blackAlpha"
                onClick={() => signOut({ redirect: false })}
              >
                <Text mr={2}>SignOut</Text>
              </Button>
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </>
  )
}

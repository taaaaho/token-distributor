import { useMoralisSession } from '@/hooks/useMoralisSession'
import { capitalize, getEllipsisTxt } from '@/utils/format'
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import SignIn from './SignIn'

import { ChevronDownIcon } from '@chakra-ui/icons'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { AddEthereumChainParameter } from '@/types/Chain'

const PolygonMain = {
  chainId: '0x89', // A 0x-prefixed hexadecimal string
  chainName: 'Matic(Poygon) Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC', // 2-6 characters long
    decimals: 18,
  },
  rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
}
interface keyObject {
  string: AddEthereumChainParameter
}
const chainList = {
  '0x89': PolygonMain,
}

export const WalletMenu: React.FC = () => {
  const { user } = useMoralisSession()
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  const [network, setNetwork] = useState<string>()
  const [balance, setBalance] = useState<string>()

  const changeNetwork = async (chainId: string) => {
    console.log(provider)
    if (provider) {
      try {
        await provider.send('wallet_switchEthereumChain', [
          { chainId: chainId },
        ])
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.send('wallet_addEthereumChain', [chainList[chainId]])
          } catch (addError) {
            console.error(addError)
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
  }

  const fetchData = async () => {
    if (provider) {
      const network = await provider.getNetwork()
      setNetwork(network.name)

      if (user) {
        const balance = await provider.getBalance(user.address)
        setBalance(ethers.utils.formatEther(balance))
      }
    }
  }
  useEffect(() => {
    const prov = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    )
    if (prov) {
      setProvider(prov)
    }
    if (provider) {
      fetchData()
    }
  }, [provider])

  return (
    <>
      <Popover>
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
            </PopoverHeader>
            <PopoverBody>
              {/* <Box>
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
                        changeNetwork('0x1')
                      }}
                    >
                      Etherium
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        changeNetwork('0x89')
                      }}
                    >
                      Polygon
                    </MenuItem>
                    <MenuDivider />
                    <Text ml={1} fontWeight="semibold">
                      Testnet
                    </Text>
                    <MenuItem
                      onClick={() => {
                        changeNetwork('0x5')
                      }}
                    >
                      Goerli
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        changeNetwork('0x13881')
                      }}
                    >
                      Mumbai
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box> */}
              <Button
                mt={2}
                size="sm"
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

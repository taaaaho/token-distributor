import React, { useState } from 'react'
import { Box, Button, HStack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { TokenAllocator } from '@prisma/client'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import Link from 'next/link'
import { formatDate, getEllipsisTxt } from '@/utils/format'
import { useMoralisSession } from '@/hooks/useMoralisSession'
import { Loading } from './Loading'

export const TokenAllocators = () => {
  const { user } = useMoralisSession()
  const [tokenAllocators, setTokenAllocators] = useState<TokenAllocator[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchTokenAllocators = async () => {
    const res = await axios.get<TokenAllocator[]>(
      `${window.origin}/api/tokenAllocators/${user.address}`
    )
    setTokenAllocators(res.data)
  }

  return (
    <Box w="100%" px={{ base: 4, md: 12 }}>
      <HStack justifyContent="space-between">
        <Button
          color="#010101"
          onClick={fetchTokenAllocators}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Fetch
        </Button>
        <Link href="/tokenAllocator/new">
          <Button color="#010101">New</Button>
        </Link>
      </HStack>
      {tokenAllocators.length > 0 ? (
        <TableContainer w="100%">
          <Table variant="simple">
            <TableCaption>Allocation Contracts</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Desctiption</Th>
                <Th>Network</Th>
                <Th>Contract</Th>
                <Th>CreatedAt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tokenAllocators.map((tokenAllocators) => (
                <Link href={`/${tokenAllocators.id}`} key={tokenAllocators.id}>
                  <Tr cursor="pointer">
                    <Td>{tokenAllocators.name}</Td>
                    <Td>{tokenAllocators.description}</Td>
                    <Td>{tokenAllocators.network}</Td>
                    <Td>{getEllipsisTxt(tokenAllocators.contract)}</Td>
                    <Td>{formatDate(tokenAllocators.createdAt.toString())}</Td>
                  </Tr>
                </Link>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : isLoading ? (
        <Loading />
      ) : (
        <Box mt={4}>
          <Text>There are no data... </Text>
          <Text>Please fetch or create contracts.</Text>
        </Box>
      )}
    </Box>
  )
}

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
        <Button color="#010101">
          <Link href="/new">New</Link>
        </Button>
      </HStack>
      {tokenAllocators.length > 0 ? (
        <TableContainer w="100%">
          <Table variant="simple">
            <TableCaption>Allocation Contracts</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Desctiption</Th>
                <Th>Contract</Th>
                <Th>CreatedAt</Th>
                <Th>UpdatedAt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tokenAllocators.map((tokenAllocators) => (
                <Tr key={tokenAllocators.id}>
                  <Td>
                    <Link href={`/${tokenAllocators.id}`}>
                      {tokenAllocators.id}
                    </Link>
                  </Td>
                  <Td>{tokenAllocators.name}</Td>
                  <Td>{tokenAllocators.description}</Td>
                  <Td>{getEllipsisTxt(tokenAllocators.contract)}</Td>
                  <Td>{formatDate(tokenAllocators.createdAt.toString())}</Td>
                  <Td>{formatDate(tokenAllocators.updatedAt.toString())}</Td>
                </Tr>
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

import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import { User, TokenAllocator } from '@prisma/client'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatDate, getEllipsisTxt } from '@/utils/format'
import { useMoralisSession } from '@/hooks/useMoralisSession'

export const TokenAllocators = () => {
  const { user } = useMoralisSession()
  const router = useRouter()
  const [tokenAllocators, setTokenAllocators] = useState<TokenAllocator[]>([])
  const fetchTokenAllocators = async () => {
    const res = await axios.get<TokenAllocator[]>(
      `${window.origin}/api/tokenAllocators/${user.address}`
    )
    setTokenAllocators(res.data)
  }

  return (
    <Box w="100%" px={{ base: 4, md: 12 }}>
      <HStack justifyContent="space-between">
        <Button color="#010101" onClick={fetchTokenAllocators}>
          Fetch
        </Button>
        <Button color="#010101" onClick={() => router.push('/new')}>
          New
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
      ) : (
        <Box mt={4}>
          <Text>There are no data... </Text>
          <Text>Please fetch or create contracts.</Text>
        </Box>
      )}
    </Box>
  )
}

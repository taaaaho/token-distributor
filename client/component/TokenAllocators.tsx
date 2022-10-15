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

export const TokenAllocators = () => {
  const router = useRouter()
  const [tokenAllocators, setTokenAllocators] = useState<TokenAllocator[]>([])
  const fetchTokenAllocators = async () => {
    const res = await axios.get<TokenAllocator[]>(
      `${window.origin}/api/tokenAllocators/0xD53964fEA76812b4c448357F73c9D08DbA5eBBa7`
    )
    setTokenAllocators(res.data)
  }

  return (
    <Box w="90%">
      <HStack justifyContent="space-between">
        <Button colorScheme="purple" onClick={fetchTokenAllocators}>
          Fetch
        </Button>
      </HStack>
      <TableContainer w="100%">
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
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
              <Tr>
                <Td>
                  <Link href={`/owners/${tokenAllocators.owner}`}>
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
    </Box>
  )
}

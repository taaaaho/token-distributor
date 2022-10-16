import React from 'react'
import { Input, Stack, Text } from '@chakra-ui/react'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

import { FormControl, FormLabel } from '@chakra-ui/react'
import { Allocation, TokenAllocator } from '@prisma/client'
import { formatDate } from '@/utils/format'

interface Props {
  tokenAllocator:
    | TokenAllocator & {
        allocations: Allocation[]
      }
}
export const ViewTokenAllocations: React.FC<Props> = (props) => {
  const { tokenAllocator } = props

  return (
    <Stack gap={2}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input defaultValue={tokenAllocator.name} disabled={true} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          defaultValue={
            tokenAllocator.description ? tokenAllocator.description : ''
          }
          disabled={true}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Contract Address</FormLabel>
        <Input defaultValue={tokenAllocator.contract} disabled={true} />
      </FormControl>
      <FormControl>
        <FormLabel>Created At</FormLabel>
        <Input
          defaultValue={formatDate(tokenAllocator.createdAt.toString())}
          disabled={true}
        />
      </FormControl>
      <Text fontSize="xl" fontWeight="bold">
        Allocations
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Wallet Address</Th>
              <Th isNumeric>Proportion</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokenAllocator.allocations.map((allocation, index) => (
              <Tr key={allocation.id}>
                <Td>{allocation.wallet}</Td>
                <Td isNumeric>{allocation.proportion}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Wallet Address</Th>
              <Th isNumeric>Proportion</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Stack>
  )
}

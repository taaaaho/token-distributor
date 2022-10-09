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
import { User } from '@prisma/client'

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

export const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const getUsers = async () => {
    const res = await axios.get<User[]>(`${window.origin}/api/users`)
    setUsers(res.data)
  }

  return (
    <Box w="80%">
      <HStack justifyContent="space-between">
        <Button onClick={getUsers}>Fetch Users</Button>
      </HStack>
      <TableContainer w="100%">
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>EMail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Link href={`/users/${user.id}`}>
                <Tr cursor="pointer">
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              </Link>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

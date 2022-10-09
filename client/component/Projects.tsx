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
import { Project, User } from '@prisma/client'

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

export const Projects = () => {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const fetchProjects = async () => {
    const res = await axios.get<Project[]>(
      `${window.origin}/api/projects/${router.query.userId}`
    )
    setProjects(res.data)
    console.log(res.data)
  }

  return (
    <Box w="80%">
      <HStack justifyContent="space-between">
        <Button onClick={fetchProjects}>Fetch</Button>
      </HStack>
      <TableContainer w="100%">
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((projects) => (
              <Tr>
                <Td>{projects.id}</Td>
                <Td>{projects.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

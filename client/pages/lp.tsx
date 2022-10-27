import { LPLayout } from '@/layouts/LP'
import {
  Box,
  Button,
  Center,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'
// import AllocationImage from '../public/LP/Allocations_edit.png'
import Link from 'next/link'

const Home: NextPageWithLayout = () => {
  return (
    <Center h="100vh" w="100vw" alignItems="start" mt={{ base: 16, md: 0 }}>
      <VStack w="100vw" gap={12}>
        <Box
          w="80%"
          h={{ base: '140px', md: '320px' }}
          //   backgroundImage={'LP/demo.png'}
          //   backgroundSize="70%"
          //   backgroundRepeat="no-repeat"
          //   backgroundPosition="right"
        >
          <Stack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            h="320px"
            // bg="rgba(0,0,0,0.5)"
            direction={['column', 'row']}
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: 32, md: 64 }}
              letterSpacing={{ base: 4, md: 8 }}
              lineHeight={{ base: '50px', md: '70px' }}
            >
              TOKEN
              <br />
              DISTRIBUTOR
            </Text>
            <Box></Box>
          </Stack>
        </Box>
        <Box>
          <Text
            fontWeight="bold"
            fontSize={{ base: 24, md: 48 }}
            letterSpacing={4}
            textAlign="center"
          >
            Easy fund distribution
          </Text>
          <Text
            fontSize={18}
            letterSpacing={{ base: 1, md: 2 }}
            textAlign="center"
          >
            Transparency in the distribution of funds.
            <br />
            Smooth distribution of DAO and Web3 project proceeds.
          </Text>
        </Box>
        <Stack
          w="90%"
          justifyContent="center"
          alignItems="flex-start"
          direction={['column', 'row']}
          gap={4}
        >
          <Center w={{ base: '100%', md: '40%' }}>
            <Image
              src="/LP/Allocations_edit.png"
              width={(614 * 2) / 3}
              height={(386 * 2) / 3}
              alt="Allocation image"
            ></Image>
          </Center>
          <Box
            w={{ base: '100%', md: '40%' }}
            h={{ base: '120px', md: '250px' }}
            p={{ base: 1, md: 4 }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Text fontSize={22} fontWeight="semibold">
              Confirmation Allocations with GUI
            </Text>
            <Text fontSize={18} mt={4}>
              Token distribution can be easily done via the web.
              <br />
              Visual confirmation of ratios without looking at the contract
            </Text>
          </Box>
        </Stack>
        <HStack
          w={{ base: '90%', md: '70%' }}
          h={{ base: '100px', md: '150px' }}
          // bgColor="blackAlpha.600"
          borderRadius="2xl"
          justifyContent="center"
        >
          <Button
            // bgColor="blackAlpha.700"
            color="#010101"
            fontSize="xl"
            px={20}
            py={7}
          >
            <Link href="https://app.token-distributor.xyz/">Launch App</Link>
          </Button>
        </HStack>
      </VStack>
    </Center>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LPLayout>{page}</LPLayout>
}

export default Home

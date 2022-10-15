import { Spinner, Text, VStack } from '@chakra-ui/react'

export const Loading: React.FC = () => {
  return (
    <VStack justifyContent="center" height="100%">
      <Spinner size="lg" />
      <Text fontSize="xl">Loading...</Text>
    </VStack>
  )
}

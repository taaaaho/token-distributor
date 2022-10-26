import { Spinner, Text, Center, VStack } from '@chakra-ui/react'

export const Loading: React.FC = () => {
  return (
    <Center
      justifyContent="center"
      height="100%"
      width="100%"
      bg="rgba(0,0,0,0.7)"
      zIndex="10"
      top={0}
      position="fixed"
    >
      <VStack
        sx={{
          '.loading span': {
            display: 'inline-block',
            margin: '0 -.05em',
            animation: 'loading 1.2s infinite alternate',
            color: 'white',
            'font-size': '40px',
            'letter-spacing': '15px',
            'font-weight': 'bold',
          },
          '.loading span:nth-child(2)': {
            'animation-delay': '.1s',
          },
          '.loading span:nth-child(3)': {
            'animation-delay': '.2s',
          },
          '.loading span:nth-child(4)': {
            'animation-delay': '.3s',
          },
          '.loading span:nth-child(5)': {
            'animation-delay': '.4s',
          },
          '.loading span:nth-child(6)': {
            'animation-delay': '.5s',
          },
          '.loading span:nth-child(7)': {
            'animation-delay': '.6s',
          },
          '@keyframes .loading': {
            '0%': {
              opacity: '1',
            },
            '100%': {
              opacity: '0',
            },
          },
        }}
      >
        <Spinner size="lg" color="white" />
        {/* <Text fontSize="xl" letterSpacing={3} fontWeight="bold" color="white">
          Loading...
        </Text> */}
        <div className="loading">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </VStack>
    </Center>
  )
}

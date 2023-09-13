import { Button, Container, Stack } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

const SignUpOrLogin = () => {
  return (
    <div>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'center' }}
        align={{ base: 'center', md: 'center' }}>
        <ChakraLink as={ReactRouterLink} to='/signup' width='100%'>
          <Button colorScheme='orange' width='100%'>Sign up</Button>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to='/login' width='100%'>
          <Button colorScheme='gray' width='100%'>Login</Button>
        </ChakraLink>
      </Container>
    </div>
  )
}

export default SignUpOrLogin
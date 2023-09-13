import { Box, Container, Stack, useColorModeValue } from '@chakra-ui/react'

// TODO: bottom navbar with 4 buttons - My Lists, Suggestions, Search, Account
const NavBar = () => {
  return (
    <div className='footer'>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Stack direction={'row'} spacing={6}>
            <Box as='a' href={'#'}>
              Home
            </Box>
            <Box as='a' href={'#'}>
              About
            </Box>
            <Box as='a' href={'#'}>
              Blog
            </Box>
            <Box as='a' href={'#'}>
              Contact
            </Box>
          </Stack>
        </Container>
      </Box>
    </div>
  )
}

export default NavBar
import { 
  Box, 
  Container, 
  Stack, 
  useColorModeValue,
  // Link as ChakraLink,
} from '@chakra-ui/react'
import React from 'react'

interface NavBarProps {
  currentPage: string
}

// TODO: bottom navbar with 4 buttons - My Lists, Suggestions, Search, Account
const NavBar: React.FC<NavBarProps> = ({ currentPage }) => {
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
            {/* <ChakraLink as={ReactRouterLink} to='/preferences'> */}
            <Box style={currentPage === 'Likes' ? { color: 'red' } : {}}>
              Likes
            </Box>
            {/* </ChakraLink> */}
            <Box style={currentPage === 'Suggestions' ? { color: 'red' } : {}}>
              Suggestions
            </Box>
            <Box style={currentPage === 'Search' ? { color: 'red' } : {}}>
              Search
            </Box>
            <Box style={currentPage === 'Account' ? { color: 'red' } : {}}>
              Account
            </Box>
          </Stack>
        </Container>
      </Box>
    </div>
  )
}

export default NavBar
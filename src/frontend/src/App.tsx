import { ChakraProvider, Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Outlet />
      </Box>
    </ChakraProvider>
  )
}

export default App

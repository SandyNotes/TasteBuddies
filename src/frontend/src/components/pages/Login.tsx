import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // TODO: move to after success
    navigate('/dashboard');
  }
  
  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          p={8}>
          <Stack spacing={4}>
          <form onSubmit={handleSubmit}>
            <FormControl id='username'>
              <FormLabel>Username</FormLabel>
              <Input type='text' />
            </FormControl><br />
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type='submit'>
                Login
              </Button>
            </Stack>
            </form>
            <Stack pt={6}>
            <Text align={'center'}>
              Don't have an account? <ChakraLink as={ReactRouterLink} to='/signup' color={'blue.400'} >Sign up</ChakraLink>
            </Text>
          </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
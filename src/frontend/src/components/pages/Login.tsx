import { useState } from 'react'
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
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '' 
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const requestBody = {
      'username': formData.username,
      'password': formData.password
    }

    try {
      const response = await fetch(process.env.BACKENDURI + '/api/api/signin/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        console.log('Login success!')
        const responseJson = await response.json()
        localStorage.setItem('jwt', responseJson.jwt)
        navigate('/preferences')
      } else {
        console.error('Login failed')
      }
    } catch (error) {
      console.error('An error occurred', error)
    }
  }

  const handleChange = (e: { target: { name: string; value: string; } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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
                <Input type='text' name='username' value={formData.username} onChange={handleChange}/>
              </FormControl><br />
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password' value={formData.password} onChange={handleChange}/>
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
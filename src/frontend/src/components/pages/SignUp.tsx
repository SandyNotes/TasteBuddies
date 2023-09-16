import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  
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
      const signUpResponse = await fetch(process.env.BACKENDURI + '/api/api/signup/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (signUpResponse.status === 201) {
        console.log('User created!')
        const loginResponse = await fetch(process.env.BACKENDURI + '/api/api/signin/user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
        if (loginResponse.ok) {
          console.log('Login success!')
          const loginResponseJson = await loginResponse.json()
          localStorage.setItem('jwt', loginResponseJson.jwt)
          navigate('/preferences')
        } else {
          console.error('Login after signup failed:', loginResponse)
        }
      } else {
        const data = await signUpResponse.json()
        console.error('Sign up failed:', data.message)
      }
    } catch (error) {
      console.error('Error:', error)
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
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} textAlign='center'>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id='username' isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormControl><br />
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={handleChange} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl><br />
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText='Submitting'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                >
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <ChakraLink as={ReactRouterLink} to='/login' color={'blue.400'}>Login</ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignUp
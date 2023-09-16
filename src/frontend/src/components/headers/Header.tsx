import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {useNavigate} from 'react-router-dom'

interface HeaderProps {
  showBackButton: boolean
  content?: string
  element?: React.ReactElement
}

const Header: React.FC<HeaderProps> = ({ showBackButton, content }) => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} px={4}>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
          <ArrowBackIcon onClick={goBack} visibility={showBackButton ? 'visible' : 'hidden'}/> 
          <Heading size='lg' flex='1' textAlign='center'>{content}</Heading>
        </Flex>
      </Box>
    </>
  )
}

export default Header
import { CheckIcon, SmallCloseIcon, StarIcon } from '@chakra-ui/icons'
import { 
  Box, 
  Button, 
  Flex, 
  Image, 
  Link as ChakraLink, 
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const MealCard = () => {

  const meal = {
    imageUrl: 'cake.jpg',
    description: 'Recipe title recipe title recipe title',
  }

  return (
    <>
      <Image src={meal.imageUrl} mt={9} /><br />
      <Box
        mt='1'
        fontWeight='semibold'
        as='h4'
        lineHeight='tight'
        noOfLines={1}
      >
        {meal.description}
      </Box><br />
      <Flex justifyContent='space-around'>
        <Button
          borderRadius='full'
          bg='red.500'
          size='md'
          color='white'
          p={0}
          _hover={{ bg: 'red.600' }}
        >
          <SmallCloseIcon boxSize={8} />
        </Button>
        <Button
          borderRadius='full'
          bg='yellow.400'
          size='md'
          color='white'
          p={0}
          _hover={{ bg: 'yellow.600' }}
        >
          <StarIcon boxSize={5} />
        </Button>
        <ChakraLink as={ReactRouterLink} to='/mealdetails' color={'blue.400'}>
          <Button
            borderRadius='full'
            bg='green.500'
            size='md'
            color='white'
            p={0}
            _hover={{ bg: 'green.600' }}
          >
            <CheckIcon boxSize={6} />
          </Button>
        </ChakraLink>
      </Flex>
    </>
  )
}

export default MealCard
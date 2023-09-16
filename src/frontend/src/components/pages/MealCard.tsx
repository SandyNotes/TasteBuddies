import { CheckIcon, SmallCloseIcon, StarIcon } from '@chakra-ui/icons'
import { 
  Box, 
  Button, 
  Flex, 
  Image, 
  Link as ChakraLink, 
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
// @ts-ignore
const MealCard = ({ meal, setCurrentIndex, totalLength, currentIndex}) => {
  const RejectFood = () => {
    if(currentIndex === totalLength - 1){
      console.log("finished!")
    }else{
      setCurrentIndex(currentIndex += 1)
    }
  }
  const CreateFavorite = async() => {
      
      let token = localStorage.getItem("jwt");
      
      const foodData = {
        'encoded_jwt': token,
        'favorited_item': meal
      }
      
      console.log(process.env.BACKENDURI)
      const foodResponse = await fetch(process.env.BACKENDURI + '/api/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(foodData),
      })
      if (foodResponse.ok) {
          console.log("Added successfully!")
      }
  }
  return (
    <>
      <Image src={meal.image} mt={9} /><br />
      <Box
        mt='1'
        fontWeight='semibold'
        as='h4'
        lineHeight='tight'
        noOfLines={1}
      >
        {meal.title}
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
          <SmallCloseIcon boxSize={8} onClick={RejectFood}/>
        </Button>
        <Button
          borderRadius='full'
          bg='yellow.400'
          size='md'
          color='white'
          p={0}
          _hover={{ bg: 'yellow.600' }}
        >
          <StarIcon boxSize={5} onClick={CreateFavorite}/>
        </Button>
        <ChakraLink as={ReactRouterLink} to='/mealdetails' color={'blue.400'} state={{ meal: meal}}>
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
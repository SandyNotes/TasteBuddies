import { 
  Container, 
  Flex 
} from '@chakra-ui/react'
import MealCard from './MealCard'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const location = useLocation()
  const foodData = location.state?.foodData
  console.log(foodData)

  return (
    <>
      <Flex flex='1' p={4} flexDirection='column' alignItems='center' justifyContent='center'>
        <Container maxW='lg' textAlign='center'>
          <MealCard />
        </Container>
      </Flex>
    </>
  )

}

export default Dashboard
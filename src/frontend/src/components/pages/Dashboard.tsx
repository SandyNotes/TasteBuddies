import { 
  Container, 
  Flex 
} from '@chakra-ui/react'
import MealCard from './MealCard'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
const Dashboard = () => {
  const location = useLocation()
  const foodData = location.state?.foodData.results
  const [currentIndex, setCurrentIndex] = useState(0);
  const lengthOfArray = foodData.length;
  console.log(currentIndex)
  return (
    <>
      <Flex flex='1' p={4} flexDirection='column' alignItems='center' justifyContent='center'>
        <Container maxW='lg' textAlign='center'>
          <MealCard meal={foodData[currentIndex]} setCurrentIndex={setCurrentIndex} totalLength={lengthOfArray} currentIndex={currentIndex}/>
        </Container>
      </Flex>
    </>
  )

}

export default Dashboard
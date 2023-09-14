import { Container, Flex } from '@chakra-ui/react'
import MealCard from './MealCard'

const Dashboard = () => {
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
import { Container, Flex, Heading } from '@chakra-ui/react'

const Home = () => {
	return (
		<>
			<Flex flex='1' p={4} flexDirection='column' alignItems='center' justifyContent='center' className='home-bg'>
				<Container maxW='lg' textAlign='center'>
					<Heading color='white'>Content</Heading>
				</Container>
			</Flex>
		</>
	)
}

export default Home
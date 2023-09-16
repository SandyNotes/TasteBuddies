import React, { useState } from 'react'
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

// https://spoonacular.com/food-api/docs#Intolerances
interface Intolerance {
  'Dairy': boolean;
  'Egg': boolean;
  'Gluten': boolean;
  'Grain': boolean;
  'Peanut': boolean;
  'Seafood': boolean;
  'Sesame': boolean;
  'Shellfish': boolean;
  'Soy': boolean;
  'Sulfite': boolean;
  'Tree nut': boolean;
  'Wheat': boolean;
}

// https://spoonacular.com/food-api/docs#Diets
interface Diet {
  'Gluten free': boolean;
  'Ketogenic': boolean;
  'Vegetarian': boolean;
  'Lacto-vegetarian': boolean;
  'Ovo-vegetarian': boolean;
  'Vegan': boolean;
  'Pescetarian': boolean;
  'Paleo': boolean;
  'Primal': boolean;
  'Low FODMAP': boolean;
  'Whole30': boolean;
}

const Preferences = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('jwt')

  const [intolerances, setIntolerances] = useState<Intolerance>({
    'Dairy': false,
    'Egg': false,
    'Gluten': false,
    'Grain': false,
    'Peanut': false,
    'Seafood': false,
    'Sesame': false,
    'Shellfish': false,
    'Soy': false,
    'Sulfite': false,
    'Tree nut': false,
    'Wheat': false
  })

  const [diets, setDiets] = useState<Diet>({
    'Gluten free': false,
    'Ketogenic': false,
    'Vegetarian': false,
    'Lacto-vegetarian': false,
    'Ovo-vegetarian': false,
    'Vegan': false,
    'Pescetarian': false,
    'Paleo': false,
    'Primal': false,
    'Low FODMAP': false,
    'Whole30': false
  })

  const handleIntoleranceToggle = (item: keyof Intolerance) => {
    setIntolerances((prevIntolerances) => ({
      ...prevIntolerances,
      [item]: !prevIntolerances[item],
    }))
  }

  const handleDietToggle = (item: keyof Diet) => {
    setDiets((prevDiets) => ({
      ...prevDiets,
      [item]: !prevDiets[item],
    }))
  }

  const selectedIntolerances = (Object.keys(intolerances) as (keyof Intolerance)[]).filter(
    (item) => intolerances[item] === true
  )

  const selectedDiets = (Object.keys(diets) as (keyof Diet)[]).filter(
    (item) => diets[item] === true
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const intolerancesData = {
      'encoded_jwt': token,
      'intolerances': selectedIntolerances.map(item => item.toString()),
    }
    
    try {
      const intoleranceResponse = await fetch(process.env.BACKENDURI + '/api/api/intolerances/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(intolerancesData),
      })

      if (intoleranceResponse.ok) {
        console.log('Intolerances saved successfully')

        const foodData = {
          'jwt': token,
          'diet_types': selectedDiets.map(item => item.toString()),
        }
        
        const foodResponse = await fetch(process.env.BACKENDURI + '/api/api/food/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(foodData),
        })
        if (foodResponse.ok) {
          console.log('Diets saved successfully')
          const foodResponseJson = await foodResponse.json()
          console.log(foodResponseJson)
          localStorage.setItem('jwt', foodResponseJson.jwt)
          navigate('/dashboard', { state: { foodData } })
        }
        else {
          console.error('Failed to save diets:', foodResponse)
        }
      } else {
        console.error('Failed to save intolerances:', intoleranceResponse)
      }
    } catch (error) {
      console.error('Error while saving preferences:', error)
    }
  }

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <VStack align='start' spacing={4} mt={4}>
          <FormControl>
            <FormLabel>Filter by popular diets:</FormLabel>
            {Object.keys(diets).map((item) => (
              <Flex key={item}>
                <Box>{item}</Box>
                <Spacer />
                <Switch
                  isChecked={diets[item as keyof Diet]}
                  onChange={() => handleDietToggle(item as keyof Diet)}
                />
              </Flex>
            ))}
          </FormControl><br />
          <FormControl>
            <FormLabel>Filter out food intolerances:</FormLabel>
            {Object.keys(intolerances).map((item) => (
              <Flex key={item}>
                <Box>{item}</Box>
                <Spacer />
                <Switch
                  isChecked={intolerances[item as keyof Intolerance]}
                  onChange={() => handleIntoleranceToggle(item as keyof Intolerance)}
                />
              </Flex>
            ))}
          </FormControl><br />
          <Button
            loadingText='Processing'
            bg={'orange.400'}
            color={'white'}
            type='submit' width='100%'>
            Next
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default Preferences
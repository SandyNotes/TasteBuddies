import { 
  Image, 
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
// @ts-ignore
const MealDetails = () => {
  let { state } = useLocation();
  let { meal } = state
  let summary = meal.summary.replace("<a>", "").replace( /(<([^>]+)>)/ig, '');
  let instructions = meal.analyzedInstructions[0].steps
  
  return (
    <>
      <p>{meal.title}</p>
      <Image src={meal.image} mt={9} /><br />
      <p>{summary}</p>
      <p>Instructions:</p>
      {/* 
      // @ts-ignore */}
      {instructions.map(instruction => <li key={instruction.number}>{instruction.step}</li>)}
    </>
  )
}

export default MealDetails
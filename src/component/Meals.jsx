import Meal from './Meal';
import { FoodContext } from '../store/food-store';
import { useContext } from 'react';

export default function Meals() {
  const { foods } = useContext(FoodContext);
  return <section id="meals">{foods.length && foods.map((food) => <Meal food={food} key={food.id}/>)}</section>;
}

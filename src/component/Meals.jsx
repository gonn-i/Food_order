import Meal from './Meal';
import LoadingSpinner from './UI/Loading';
import { FoodContext } from '../store/FoodContext';
import { useContext } from 'react';

export default function Meals() {
  const { foods } = useContext(FoodContext);
  return (
    <section id="meals">
      {foods.length > 0 && foods.map((food) => <Meal food={food} key={food.id} />)}
      {foods.length == 0 && <LoadingSpinner context="Fetching datas.." />}
    </section>
  );
}

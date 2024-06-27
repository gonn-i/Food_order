import { useContext } from "react";
import { FoodContext } from '../store/food-store';

export default function Meal({ food }) {
  const { addItemToCart } = useContext( FoodContext );
  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${food.image}`} alt={food.name} />
        <h3>{food.name}</h3>
        <span className="meal-item-price">{food.price}</span>
        <div className="meal-item-description">{food.description}</div>
        <button className="button" onClick={() =>addItemToCart(food.id)}>Add to Carts</button>
      </article>
    </div>
  );
}

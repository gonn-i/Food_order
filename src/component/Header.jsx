import {useRef, useContext } from 'react'
import { FoodContext } from '../store/food-store';
import Cart from './Cart';

export default function Header() {
  const CartRef = useRef()
  const {cartFood, totalQuantity} = useContext(FoodContext)


  function cartClicked () {
    CartRef.current.showModal();
  }


  return (
    <header id="main-header">
      <Cart ref={CartRef}/>
      <div id="title">
        <h1>reactfood</h1>
      </div>
      <span>
        <button className="text-button" onClick={cartClicked}>Cart {`(${totalQuantity})`}</button>
      </span>
    </header>
  );
}

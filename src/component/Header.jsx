import LOGO from '../assets/logo.jpg';
import {useRef, useContext } from 'react'
import { FoodContext } from '../store/food-store';
import Cart from './Cart';

export default function Header() {
  const CartRef = useRef()
  const {cartFood} = useContext(FoodContext)

  function cartClicked () {
    CartRef.current.showModal();
  }


  return (
    <header id="main-header">
      <Cart ref={CartRef}/>
      <div id="title">
        <img src={LOGO} alt="logo_png" />
        <h1>reactfood</h1>
      </div>
      <span>
        <button className="text-button" onClick={cartClicked}>Cart {`(${cartFood.length})`}</button>
      </span>
    </header>
  );
}

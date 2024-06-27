import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { FoodContext } from "../store/food-store";

const Cart = forwardRef(function Cart ({},ref) {
  const {cartFood, updateItemQuantity} = useContext(FoodContext)
  const ModalRef = useRef()

  function calculateTotal (cartFood) {
    let result = 0;
    cartFood.map((item) => result+= item.price* item.quantity)
    return result
  }

  return (
    <dialog className='modal' ref={ref}>
      <div className="cart"> 
        <h2>Your Cart</h2>
        <ul>
          {cartFood.map((cart) => (
            <li  className="cart-item" key={cart.id}>
              <p> {cart.name} -{cart.quantity} X $ {cart.price}</p>
              <div className="cart-item-actions">
                <button onClick={() => updateItemQuantity(cart.id, -1)}>-</button>
                <p>{cart.quantity}</p>
                <button  onClick={() => updateItemQuantity(cart.id, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total">Total ${calculateTotal(cartFood)}</div>
        <form method='dialog' className="modal-actions">
          <button className="text-button">Close</button>
          <button className="text-button" ref={ModalRef}>Go to Checkout</button>
        </form>
      </div>
    </dialog>
  )
})

export default Cart;
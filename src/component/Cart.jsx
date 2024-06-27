import { forwardRef,  useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { FoodContext } from "../store/food-store";


const Cart = forwardRef(function Cart ({},ref) {
  const {cartFood, updateItemQuantity, totalPrice} = useContext(FoodContext)
  const [showCheckoutModal, setshowCheckoutModal] = useState(false)
  const [showSuccessModal, setshowSuccessModal] = useState(false)
  const ModalRef = useRef()

  return (
    <>
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
          <div className="cart-total">Total ${totalPrice}</div>
          <form className="modal-actions">
            <button className="text-button" onClick={() => ModalRef.current.close()} >Close</button>
            <button className="button" onClick={() => showCheckoutModal(true)}>Go to Checkout</button>
          </form>
        </div>
      </dialog>
      {showCheckoutModal && < CheckoutModal setprev={setshowCheckoutModal} setnext={setshowSuccessModal}/>}
    </>
  );
});


export default Cart;
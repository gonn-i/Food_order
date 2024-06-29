import { useContext } from 'react';
import { FoodContext } from '../../store/FoodContext';
import ModalContext from '../../store/ModalContext';
import Modal from './Modal';

export default function Cart() {
  const { cartFood, updateItemQuantity, totalPrice } = useContext(FoodContext);
  const ModalContextCtx = useContext(ModalContext);

  function handleHideCart() {
    ModalContextCtx.hideCart();
  }

  function handleShowCheckout() {
    ModalContextCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={ModalContextCtx.progress === 'cart'}
      onClose={ModalContextCtx.progress === 'cart' ? handleHideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartFood.map((cart) => (
          <li className="cart-item" key={cart.id}>
            <p>
              {cart.name} -{cart.quantity} X $ {cart.price}
            </p>
            <div className="cart-item-actions">
              <button onClick={() => updateItemQuantity(cart.id, -1)}>-</button>
              <p>{cart.quantity}</p>
              <button onClick={() => updateItemQuantity(cart.id, 1)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total ${totalPrice}</div>
      <p className="modal-actions">
        <button className="text-button" onClick={handleHideCart}>
          Close
        </button>
        {cartFood.length > 0 && (
          <button className="button" onClick={handleShowCheckout}>
            Go to Checkout
          </button>
        )}
      </p>
    </Modal>
  );
}

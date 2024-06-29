import { useContext } from 'react';
import { FoodContext } from '../store/FoodContext';
import ModalContext from '../store/ModalContext';

export default function Header() {
  const { totalQuantity } = useContext(FoodContext);
  const ModalContextCtx = useContext(ModalContext);

  function handleShowCart() {
    ModalContextCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <h1>reactfood</h1>
      </div>
      <nav>
        <button className="text-button" onClick={handleShowCart}>
          Cart {`(${totalQuantity})`}
        </button>
      </nav>
    </header>
  );
}

import { FoodProvider } from './store/FoodContext';
import { ModalContextProvider } from './store/ModalContext';
import Header from './component/Header';
import Meals from './component/Meals';
import Cart from './component/UI/CartModal';
import Checkout from './component/UI/CheckoutModal';

function App() {
  return (
    <ModalContextProvider>
      <FoodProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </FoodProvider>
    </ModalContextProvider>
  );
}

export default App;

import { FoodContext, FoodProvider } from './store/food-store';
import Header from './component/Header';
import Meals from './component/Meals';

function App() {
  return (
    <FoodProvider>
      <Header />
      <Meals />
    </FoodProvider>
  );
}

export default App;

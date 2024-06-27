import { createContext, useEffect, useReducer, useState } from 'react';
import { getFood } from '../apis/api';

export const FoodContext = createContext({
  foods: [],
  cartFood: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updateItems = [...state.cartFood];
    const { foods, productId } = action.payload;

    const existingCartItemIdx = updateItems.findIndex((cartFood) => cartFood.id === productId);
    const existingCartItem = updateItems[existingCartItemIdx];

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updateItems[existingCartItemIdx] = updateItem;
    } else {
      const product = foods.find((product) => product.id === productId);
      updateItems.push({
        id: productId,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
    return {
      ...state,
      cartFood: updateItems,
    };
  }
  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.cartFood];
    const updatedItemIndex = updatedItems.findIndex((food) => food.id === action.payload.productId);

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      cartFood: updatedItems,
    };
  }
  return state;
}

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    cartFood: [],
  });

  // Food list get
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await getFood();
        setFoods(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchFood();
  }, []);

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: {
        foods,
        productId: id,
      },
    });
  }

  function handleUpdateCartItemQuantity(id, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId: id,
        amount,
      },
    });
  }

  const ctxValue = {
    foods: foods,
    cartFood: shoppingCartState.cartFood,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return <FoodContext.Provider value={ctxValue}>{children}</FoodContext.Provider>;
}

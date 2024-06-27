import { createContext, useEffect, useReducer, useState } from 'react';
import { getFood } from '../apis/api';

export const FoodContext = createContext({
  foods: [],
  cartFood: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  totalPrice: 0,
  totalQuantity: 0,
});

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updateItems = [...state.cartFood];
      let { foods, productId } = action.payload;

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

      const totalPrice = updateItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const totalQuantity = state.totalQuantity +1;

      return {
        ...state,
        cartFood: updateItems,
        totalPrice,
        totalQuantity
      };
    }
    case 'UPDATE_ITEM': {
      const updatedItems = [...state.cartFood];
      const updatedItemIndex = updatedItems.findIndex((food) => food.id === action.payload.productId);

      if (updatedItemIndex !== -1) {
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;
        const totalQuantity = state.totalQuantity +1;

        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }

        const totalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        return {
          ...state,
          cartFood: updatedItems,
          totalPrice,
          totalQuantity
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    cartFood: [],
    totalPrice: 0,
    totalQuantity: 0,
  });

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
    totalPrice: shoppingCartState.totalPrice.toFixed(2),
    totalQuantity: shoppingCartState.totalQuantity
  };

  return <FoodContext.Provider value={ctxValue}>{children}</FoodContext.Provider>;
}

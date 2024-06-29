// src/store/FoodContext.js

import { createContext, useEffect, useReducer } from 'react';
import { useApi } from '../hooks/useApi';

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
      const totalQuantity = state.totalQuantity + 1;

      return {
        ...state,
        cartFood: updateItems,
        totalPrice,
        totalQuantity,
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
        const totalQuantity = state.totalQuantity + action.payload.amount;

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
          totalQuantity,
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export function FoodProvider({ children }) {
  const { loading, error, foodData, fetchFood } = useApi();
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    cartFood: [],
    totalPrice: 0,
    totalQuantity: 0,
  });

  // 음식 리스트에 대한 정보 가져옴 -> food
  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: {
        foods: foodData || [],
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
    foods: foodData || [],
    cartFood: shoppingCartState.cartFood,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    totalPrice: shoppingCartState.totalPrice.toFixed(2),
    totalQuantity: shoppingCartState.totalQuantity,
    loading,
    error,
  };

  return <FoodContext.Provider value={ctxValue}>{children}</FoodContext.Provider>;
}

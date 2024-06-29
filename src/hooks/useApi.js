import { useState, useCallback } from 'react';
import { getFood, postUserInfo } from '../apis/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [orderResponse, setOrderResponse] = useState(null);

  const fetchFood = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFood();
      setFoodData(data);
    } catch (error) {
      console.error('Failed to fetch food data:', error);
      setError(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitOrder = useCallback(async (cartFood, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postUserInfo(cartFood, userData);
      setOrderResponse(response);
    } catch (error) {
      console.error('Failed to submit order:', error);
      setError(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    foodData,
    orderResponse,
    fetchFood,
    submitOrder,
  };
};

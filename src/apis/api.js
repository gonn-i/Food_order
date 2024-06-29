import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.defaults.timeout = 5000;
instance.defaults.headers.post['Content-Type'] = 'application/json';

export async function getFood() {
  try {
    const res = await instance.get('/meals');
    return res.data;
  } catch (error) {
    console.log('Error Fetching food info:', error);
    throw error;
  }
}
export async function postUserInfo(cartFood, data) {
  try {
    const res = await instance.post('/orders', {
      order: {
        items: cartFood,
        customer: data,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error posting user info:', error);
    throw error;
  }
}

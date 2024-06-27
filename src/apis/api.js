import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.defaults.timeout = 2500;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export async function getFood() {
  const res = await instance.get('/meals');
  return res.data;
}

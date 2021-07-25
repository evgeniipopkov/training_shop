const BASE_URL = 'https://rarus-chlb.corp.rarus-cloud.ru/DemoTradeShop/hs/app/';

const headers = {
  Authorization: 'Basic aHM6aHNwYXNz',
  'Content-Type': 'application/json; charset=utf-8',
};

const request = async (route, method, data) => {
  const config = { method, headers };

  if (method === 'POST') { config.body = JSON.stringify(data); }

  const response = await fetch(BASE_URL + route, config);
  if (response.ok) {
    const result = await response.json();
    return result;
  }

  throw response;
};

const login = async (data) => request('login', 'POST', data);
const getProducts = async () => request('products', 'GET');
const getProduct = async (id) => request(`product?id=${id}`, 'GET');
const getOrders = async (data) => request('orders', 'POST', data);
const postOrder = async (data) => request('order', 'POST', data);
const deleteOrder = async (id) => request(`order?id=${id}`, 'DELETE');

export default {
  login, getProducts, getProduct, postOrder, getOrders, deleteOrder,
};

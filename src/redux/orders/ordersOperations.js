import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

//! axios defaults baseURL
axios.defaults.baseURL = 'http://localhost:3333/api'; //! local backend
// axios.defaults.baseURL = 'https://pizza-markets.onrender.com/api'; //! remote backend

//! GET @ /order
export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_, thunkAPI) => {
    try {
      // const { data: { order } } = await axios.get('/orders');
      const { data } = await axios.get('/orders');
      // console.log("orders/getAllOrders == >data:", data); //!
      // console.log("orders/getAllOrders ==> data.order:", data.order); //!
      // const { order } = data;
      // console.log("orders/getAllOrders ==> order:", order); //!
      return data;
      // return data.order;
      // return order;
    } catch (error) {
      console.log(error); //!
      toast.error(
        `Ошибка запроса: ${
          error.message === 'Request failed with status code 404'
            ? 'Нет такой коллекции пользователей'
            : error.message
        }`,
        { position: 'top-center', autoClose: 2000 }
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//! POST @ /orders
export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (orderConfirmed, thunkAPI) => {
    try {
      // console.log("orders/addOrder ==> orderConfirmed:", orderConfirmed); //!
      const {
        data: { order },
      } = await axios.post('/orders', orderConfirmed);
      // console.log("orders/addOrder ==> order:", order); //!
      return order;
    } catch (error) {
      console.log(error); //!
      toast.error(
        `Ошибка запроса: ${
          error.message === 'Request failed with status code 400'
            ? 'Ошибка при создании контакта'
            : error.message
        }`,
        { position: 'top-center', autoClose: 2000 }
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

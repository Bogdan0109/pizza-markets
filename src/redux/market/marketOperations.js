import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

//! axios defaults baseURL
axios.defaults.baseURL = 'http://localhost:3333/api'; //! local backend
// axios.defaults.baseURL = 'https://pizza-markets.onrender.com/api'; //! remote backend

//! GET @ /markets
export const getAllMarkets = createAsyncThunk(
  'markets/getAllMarkets',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/markets');
      // console.log("markets/getAllMarkets==>data:", data); //!
      // const { data: { markets } } = await axios.get('/markets');
      // const { markets } = data;
      // console.log("markets/getAllMarkets == >data.markets:", data.markets); //!
      return data.markets; //?
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

//! togleIsOneShop @ /markets
export const togleIsOneShop = createAsyncThunk(
  'markets/togleIsOneShop',
  async () => {
    return null;
  }
);

//! togleIsOneShop @ /markets
export const setShopIndexSelection = createAsyncThunk(
  'markets/setShopIndexSelection',
  async shopIndex => {
    return shopIndex;
  }
);

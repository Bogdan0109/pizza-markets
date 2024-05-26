//! Redux Toolkit 
import { configureStore } from "@reduxjs/toolkit";

import { marketsPizzasReduser } from 'redux/market/marketSlice.js';
import { ordersReducer } from 'redux/orders/ordersSlice.js';




export const store = configureStore({
    reducer: {
        marketPizzas: marketsPizzasReduser,
        customerOrder: ordersReducer,
    },
});



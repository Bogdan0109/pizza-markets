import { createSlice } from '@reduxjs/toolkit';
import {
    getAllOrders,
    addOrder
} from './ordersOperations';


const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
};


const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        lastOrderNumber: "",
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [getAllOrders.pending]: handlePending,
        [addOrder.pending]: handlePending,

        [getAllOrders.rejected]: handleRejected,
        [addOrder.rejected]: handleRejected,

        [getAllOrders.fulfilled](state, { payload }) {
            // state.isLoading = false;
            // state.error = null;
            state.orders = payload;
        },

        [addOrder.fulfilled](state, { payload }) {
            // console.log("ordersSlice/addOrder ==> payload:", payload); //!
            // console.log("ordersSlice/addOrder ==> payload._id:", payload._id); //!
            state.isLoading = false;
            state.error = null;
            state.orders.push(payload);
            state.lastOrderNumber = payload._id;
        },
    },
});

export const ordersReducer = ordersSlice.reducer;

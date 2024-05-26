import { createSlice } from '@reduxjs/toolkit';
import {
    getAllMarkets,
    togleIsOneShop,
    setShopIndexSelection,
} from './marketOperations';




const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
};


const marketsSlice = createSlice({
    name: 'markets',
    initialState: {
        allMarkets: [],
        isOneShop: false,
        shopIndex: null,
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [getAllMarkets.pending]: handlePending,
        [togleIsOneShop.pending]: handlePending,
        [setShopIndexSelection.pending]: handlePending,

        [getAllMarkets.rejected]: handleRejected,
        [togleIsOneShop.rejected]: handleRejected,
        [setShopIndexSelection.rejected]: handleRejected,

        [getAllMarkets.fulfilled](state, { payload }) {
            // console.log("getAllMarkets.fulfilled --> payload:", payload); //!
            state.allMarkets = payload;
            state.isLoading = false;
            state.error = null;
        },

        [togleIsOneShop.fulfilled](state, { payload }) {
            state.isOneShop = !state.isOneShop;
            state.isLoading = false;
            state.error = null;
        },

        [setShopIndexSelection.fulfilled](state, { payload }) {
            state.shopIndex = payload;

            state.isLoading = false;
            state.error = null;
        },
    },
});

export const marketsPizzasReduser = marketsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/CounterSlice"
import { basketSlice } from "./features/basket/BasketSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        basket: basketSlice.reducer
    }
})

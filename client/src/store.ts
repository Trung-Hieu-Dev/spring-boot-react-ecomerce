import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/CounterSlice"
import { basketSlice } from "./features/basket/BasketSlice";
import { catalogSlice } from "./features/catalog/catalogSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
})

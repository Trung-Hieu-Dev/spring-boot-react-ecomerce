import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../model/Basket";

interface BasketStage {
    basket: Basket | null
}

const initialState: BasketStage = {
    basket: null
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasketReducer: (state: BasketStage, action) => {
            state.basket = action.payload;
        },
        removeItemReducer: (state, action) => {
            if (!state.basket) {
                return;
            }

            const itemIndex = state.basket.basketItems
                .findIndex((item: { productId: number }) => item.productId === action.payload.productId);

            if (itemIndex > -1) {
                state.basket.basketItems[itemIndex].quantity -= action.payload.quantity;
                if (state.basket.basketItems[itemIndex].quantity === 0) {
                    state.basket.basketItems.slice(itemIndex, 1);
                }
            }
        }
    }
});

export const {setBasketReducer, removeItemReducer} = basketSlice.actions;

export default basketSlice.reducer;

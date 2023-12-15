import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../model/Basket";
import axios from "axios";

interface BasketStage {
    basket: Basket | null,
    status: string
}

const initialState: BasketStage = {
    basket: null,
    status: 'idle'
}

export const addBasketItemThunk = createAsyncThunk<any, {productId: number, quantity?: number}>(
    'basket/addBasketItem',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            const response = await axios.post(`/baskets?productId=${productId}&quantity=${quantity}`);
            return response.data; // returned called payload
        } catch (e: any) {
            console.log(e);
            return thunkAPI.rejectWithValue(e.response.data); // thunkAPI arg used to contact outside. In this case, it returned err to component
        }
    }
)

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
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemThunk.pending, (state, action) => {
            state.status = 'pending' + action.meta.arg.productId; //  action.meta.arg.productId: to get agrs from above addBasketItemThunk
        });
        builder.addCase(addBasketItemThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.basket = action.payload;
        })
        builder.addCase(addBasketItemThunk.rejected, (state) => {
            state.status = 'failed';
        })
    }
});

export const {setBasketReducer, removeItemReducer} = basketSlice.actions;

export default basketSlice.reducer;

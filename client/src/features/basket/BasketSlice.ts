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

// call API for adding item to basket
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

// call API for removing item from basket
export const removeBasketItemThunk = createAsyncThunk<void, {productId: number, quantity?: number}>(
    'basket/removeBasketItem',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            await axios.delete(`/baskets?productId=${productId}&quantity=${quantity}`);
        } catch (e: any) {
            console.log(e);
            return thunkAPI.rejectWithValue(e.response.data);
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
                state.basket.basketItems[itemIndex].quantity -= +action.payload.quantity;
                if (state.basket.basketItems[itemIndex].quantity === 0) {
                    state.basket.basketItems.slice(itemIndex, 1);
                }
            }
        }
    },
    extraReducers: (builder) => {
        // add item to basket
        builder.addCase(addBasketItemThunk.pending, (state, action) => {
            state.status = 'pendingAdd' + action.meta.arg.productId; //  action.meta.arg.productId: to get agrs from above addBasketItemThunk
        });
        builder.addCase(addBasketItemThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.basket = action.payload;
        })
        builder.addCase(addBasketItemThunk.rejected, (state) => {
            state.status = 'failed';
        })

        // remove item from basket
        builder.addCase(removeBasketItemThunk.pending, (state, action) => {
            if (action.meta.arg.quantity === 1) {
                state.status = 'pendingRemove' + action.meta.arg.productId;
            } else {
                state.status = 'pendingRemoveAll' + action.meta.arg.productId;
            }
        });
        builder.addCase(removeBasketItemThunk.fulfilled, (state, action) => {
            const itemIndex = state.basket!.basketItems
                .findIndex((item: { productId: number }) => item.productId === action.meta.arg.productId);

            if (itemIndex !== undefined && itemIndex > -1) {
                state.basket!.basketItems[itemIndex].quantity -= +action.meta.arg.quantity!;
                if (state.basket!.basketItems[itemIndex].quantity === 0) {
                    state.basket!.basketItems.splice(itemIndex, 1);
                }
            }
            state.status = 'idle';

        });
        builder.addCase(removeBasketItemThunk.rejected, (state) => {
            state.status = 'failed';
        });
    }
});

export const {setBasketReducer, removeItemReducer} = basketSlice.actions;

// export default basketSlice.reducer;

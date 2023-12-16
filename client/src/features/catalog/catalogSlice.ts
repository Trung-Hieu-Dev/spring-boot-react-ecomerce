import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../model/Product";
import axios from "axios";


export const fetchProductsThunk = createAsyncThunk<Product[]>(
    'catalog/fetchProducts',
    async (_,thunkAPI) => {
        try {
            const response = await axios.get('/products');
            return response.data;
        } catch (e: any) {
            console.log(e.response.data);
            return  thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const fetchProductByIdThunk = createAsyncThunk<Product, number>(
    'catalog/fetchProductById',
    async (productId: number, thunkAPI) => {
        try {
            const response = await axios.get('/products/' + productId);
            return response.data;
        } catch (e: any) {
            console.log(e.response.data);
            return  thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const productsAdapter = createEntityAdapter<Product>()

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        status: 'idle',
        productLoaded: false
    }),
    reducers: {},
    extraReducers: builder => {
        // get all products
        builder.addCase(fetchProductsThunk.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload); // get all products with built-in setAll() of EntityAdapter
            state.status = 'idle';
            state.productLoaded = true;
        });
        builder.addCase(fetchProductsThunk.rejected, (state) => {
            state.status = 'error';
        });

        // get single product
        builder.addCase(fetchProductByIdThunk.pending, (state) => {
            state.status = 'pendingFetchProductById';
        });
        builder.addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.productLoaded = true;
        });
        builder.addCase(fetchProductByIdThunk.rejected, (state) => {
            state.status = 'error';
        });
    }
})

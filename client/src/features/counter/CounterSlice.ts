import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCount } from "./CounterApi";

interface CounterSlice {
    value: number;
    status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterSlice = {
    value: 0,
    status: 'idle'
}

// create a method to call API by  createAsyncThunk
export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
        const response = await fetchCount(amount);
        return response.data;
    }
);

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {state.value += 1},
        decrement: (state) => {state.value -= 1},
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
    // get result from createAsyncThunk and assign to state. cause reducers do not allow to work with api directly
    extraReducers: (builder) => {
        // in case incrementAsync pending
        builder.addCase(incrementAsync.pending, (state) => {
            state.status = 'loading';
        })

        // in case incrementAsync success
        builder.addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value += action.payload; // returned value from incrementAsync
        })

        // in case incrementAsync error
        builder.addCase(incrementAsync.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;

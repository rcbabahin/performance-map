
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { httpGetMeasurements } from '../utils/utils.js';

const initialState = {
    measurements: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const measurementsSlice = createSlice({
    name: 'measurements',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
       
        builder
            .addCase(getMeasurements.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getMeasurements.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.measurements = action.payload;
            })
            .addCase(getMeasurements.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const getMeasurements = createAsyncThunk(
    'measurements/getMeasurements', 
    async () => {
    return await httpGetMeasurements()
})

export default measurementsSlice.reducer;



import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { httpPostDevice } from '../utils/utils.js';

const initialState = {
    devices: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
       
        builder
            .addCase(registerDevice.pending, (state, action) => {
                state.status = 'loading';
            }) 
            .addCase(registerDevice.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'succeeded';
            })
            .addCase(registerDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    },
})

export const registerDevice = createAsyncThunk(
    'devices/registerDevice',
    async (device) => {
        return await httpPostDevice(device)
    }
)

export default devicesSlice.reducer;


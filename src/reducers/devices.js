
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { httpPostDevice, httpGetDevices } from '../utils/utils.js';

const initialState = {
    devices: [],
    companies: [],
    categories: ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'],
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
            .addCase(getDevices.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getDevices.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.devices = action.payload;
                state.companies = Array.from(new Set(action.payload.map(({ company }) => company)));
            })
            .addCase(getDevices.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

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

export const getDevices = createAsyncThunk(
    'devices/getDevices', 
    async () => {
    return await httpGetDevices()
})


export default devicesSlice.reducer;


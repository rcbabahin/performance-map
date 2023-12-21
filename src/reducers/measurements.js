
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { httpGetMeasurements } from '../utils/utils.js';
import { calculateBassSPL, calculateWeightedSPLAndTHD } from '../utils/calculations.js';
import { calculateRatings } from './ratings.js';

const initialState = {
    measurements: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const measurementsSlice = createSlice({
    name: 'measurements',
    initialState,
    reducers: {
        setFilter(state) {
            console.log('set filter');
        }
    },
    extraReducers: (builder) => {
       
        builder
            .addCase(getMeasurements.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getMeasurements.fulfilled, (state, action) => {
                state.status = 'succeded';

                const measurements = action.payload.map(meas => {
                    const bass = calculateBassSPL(meas.items);
                    const cornerFreq = bass['-10dB'].freq;
                
                    const calculatedData = calculateWeightedSPLAndTHD(meas.items, cornerFreq);    
                    
                    return { ...meas, bass, 'Flatness Index': calculatedData.flatnessIndex, weights: calculatedData }
                })
                console.log('loaded in measurements')
                state.measurements = state.measurements.concat(measurements);
            })
            .addCase(getMeasurements.rejected, (state, action) => {
                state.status = 'failed'

                state.error = action.error.message
            })
    },
})

export const getMeasurements = createAsyncThunk(
    'measurements/getMeasurements', 
    async (arg, thunkAPI) => {
    const result = await httpGetMeasurements()
    // console.log(thunkAPI)
    thunkAPI.dispatch(setFilter());
    return result;
})

export const { setFilter } = measurementsSlice.actions;

export default measurementsSlice.reducer;


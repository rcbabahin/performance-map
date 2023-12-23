
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { httpGetMeasurements } from '../utils/utils.js';
import { calculateBassSPL, calculateWeightedSPLAndTHD } from '../utils/calculations.js';
import { calculateGroupedBySize, selectDataFromArray } from '../utils/calculations.js';

const initialState = {
    measurements: [],
    ratings: {},
    filter: {
        rating: 'SPL',
        company: 'All',
        category: 'All'
    },
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const measurementsSlice = createSlice({
    name: 'measurements',
    initialState,
    reducers: {
        setFilter(state, action) {
            const { rating, company, category } = action.payload;

            state.filter = {
                rating,
                company,
                category
            }
        },
    },
    extraReducers: (builder) => {
       
        builder
            .addCase(getMeasurements.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getMeasurements.fulfilled, (state, action) => {
                state.status = 'succeded';
                const { devices, data } = action.payload;

                const measurements = data.map(meas => {
                    const bass = calculateBassSPL(meas.items);
                    const cornerFreq = bass['-10dB'].freq;
                
                    const calculatedData = calculateWeightedSPLAndTHD(meas.items, cornerFreq);    
                    
                    return { ...meas, bass, 'Flatness Index': calculatedData.flatnessIndex, weights: calculatedData }
                })

                state.measurements = state.measurements.concat(measurements);
                
                const grouped = calculateGroupedBySize(devices, measurements);
                
                state.ratings['SPL'] = selectDataFromArray(grouped)('SPL');
                state.ratings['Bass Performance'] = selectDataFromArray(grouped)('Bass Performance');
                state.ratings['SPL Performance'] = selectDataFromArray(grouped)('SPL Performance');
                state.ratings['Bass / SPL'] = selectDataFromArray(grouped)('Bass / SPL');
                state.ratings['Flatness Index'] = selectDataFromArray(grouped)('Flatness Index');
                state.ratings['Preference Index'] = selectDataFromArray(grouped)('Preference Index');
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
    const data = await httpGetMeasurements();

    const { devices: { devices } } = thunkAPI.getState();

    return { data, devices}
})

export const { setFilter } = measurementsSlice.actions;

export default measurementsSlice.reducer;



import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, current } from '@reduxjs/toolkit';
import { httpGetMeasurements, httpGetMeasurementById } from '../utils/utils.js';
import { calculateAllDevicesRatings, calculateBassSPL, calculateWeightedSPLAndTHD } from '../utils/calculations.js';
import { calculateGroupedBySize, selectDataFromArray } from '../utils/calculations.js';

const initialState = {
    measurements: [],
    ratings: {},
    ratingsAllDevices: {},
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
                // console.log(measurements);
                const grouped = calculateGroupedBySize(devices, measurements);
                
                state.ratings['SPL'] = selectDataFromArray(grouped)('SPL');
                state.ratings['Bass Performance'] = selectDataFromArray(grouped)('Bass Performance');
                state.ratings['SPL Performance'] = selectDataFromArray(grouped)('SPL Performance');
                state.ratings['Bass / SPL'] = selectDataFromArray(grouped)('Bass / SPL');
                state.ratings['Flatness Index'] = selectDataFromArray(grouped)('Flatness Index');
                state.ratings['Preference Index'] = selectDataFromArray(grouped)('Preference Index');
                // console.log(calculateAllDevicesRatings(devices, measurements))
                
                const ratingsAllDevices = {'xs': calculateAllDevicesRatings(devices,measurements)}

                state.ratingsAllDevices['SPL'] = selectDataFromArray(ratingsAllDevices)('SPL');
                state.ratingsAllDevices['Bass Performance'] = selectDataFromArray(ratingsAllDevices)('Bass Performance');
                state.ratingsAllDevices['SPL Performance'] = selectDataFromArray(ratingsAllDevices)('SPL Performance');
                state.ratingsAllDevices['Bass / SPL'] = selectDataFromArray(ratingsAllDevices)('Bass / SPL');
                state.ratingsAllDevices['Flatness Index'] = selectDataFromArray(ratingsAllDevices)('Flatness Index');
                state.ratingsAllDevices['Preference Index'] = selectDataFromArray(ratingsAllDevices)('Preference Index');

                // state.ratingsAllDevices = calculateAllDevicesRatings(devices, measurements);
            })
            .addCase(getMeasurements.rejected, (state, action) => {
                state.status = 'failed'

                state.error = action.error.message
            })

            .addCase(getMeasurementById.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getMeasurementById.fulfilled, (state, action) => {
                state.status = 'succeded';
                if (action.payload !== 0) {
                    const { devices, data } = action.payload;
                    
                    const bass = calculateBassSPL(data.items);
                    const cornerFreq = bass['-10dB'].freq;
                
                    const calculatedData = calculateWeightedSPLAndTHD(data.items, cornerFreq);    
                    
                    const newMeasurement = { id: +data.id, items: data.items, bass, 'Flatness Index': calculatedData.flatnessIndex, weights: calculatedData }
                    
                    state.measurements.push(newMeasurement);
                    
                    if (state.measurements.length > 1) {
                        const grouped = calculateGroupedBySize(devices, current(state.measurements));
                
                        state.ratings['SPL'] = selectDataFromArray(grouped)('SPL');
                        state.ratings['Bass Performance'] = selectDataFromArray(grouped)('Bass Performance');
                        state.ratings['SPL Performance'] = selectDataFromArray(grouped)('SPL Performance');
                        state.ratings['Bass / SPL'] = selectDataFromArray(grouped)('Bass / SPL');
                        state.ratings['Flatness Index'] = selectDataFromArray(grouped)('Flatness Index');
                        state.ratings['Preference Index'] = selectDataFromArray(grouped)('Preference Index');
                        // console.log(calculateAllDevicesRatings(devices, measurements))
                        
                        const ratingsAllDevices = {'xs': calculateAllDevicesRatings(devices, current(state.measurements))}
        
                        state.ratingsAllDevices['SPL'] = selectDataFromArray(ratingsAllDevices)('SPL');
                        state.ratingsAllDevices['Bass Performance'] = selectDataFromArray(ratingsAllDevices)('Bass Performance');
                        state.ratingsAllDevices['SPL Performance'] = selectDataFromArray(ratingsAllDevices)('SPL Performance');
                        state.ratingsAllDevices['Bass / SPL'] = selectDataFromArray(ratingsAllDevices)('Bass / SPL');
                        state.ratingsAllDevices['Flatness Index'] = selectDataFromArray(ratingsAllDevices)('Flatness Index');
                        state.ratingsAllDevices['Preference Index'] = selectDataFromArray(ratingsAllDevices)('Preference Index');
                    }
                }
            })
            .addCase(getMeasurementById.rejected, (state, action) => {
                state.status = 'failed'
                
                state.error = action.error.message
            })

            .addCase(deleteMeasurement.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteMeasurement.fulfilled, (state, action) => {
                state.status = 'succeded';
                const deviceId = action.payload;

                if (deviceId) {
                    const idIndex = state.measurements.findIndex(measurement => measurement.id === deviceId);

                    state.measurements.splice(idIndex, 1);
                }
            })
            .addCase(deleteMeasurement.rejected, (state, action) => {
                state.status = 'failed'
                
                state.error = action.error.message
            })

            .addCase(updateMeasurement.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateMeasurement.fulfilled, (state, action) => {
                state.status = 'succeded';
                const { devices, data } = action.payload;

                const bass = calculateBassSPL(data.items);
                const cornerFreq = bass['-10dB'].freq;
            
                const calculatedData = calculateWeightedSPLAndTHD(data.items, cornerFreq);    
                
                const newMeasurement = { id: +data.id, items: data.items, bass, 'Flatness Index': calculatedData.flatnessIndex, weights: calculatedData }
                // console.log(data.id)
                const idIndex = current(state.measurements).findIndex(measurement => measurement.id === newMeasurement.id);
                // console.log(current(state.measurements))
                state.measurements[idIndex] = newMeasurement;
                
                const grouped = calculateGroupedBySize(devices, current(state.measurements));
                    
                state.ratings['SPL'] = selectDataFromArray(grouped)('SPL');
                state.ratings['Bass Performance'] = selectDataFromArray(grouped)('Bass Performance');
                state.ratings['SPL Performance'] = selectDataFromArray(grouped)('SPL Performance');
                state.ratings['Bass / SPL'] = selectDataFromArray(grouped)('Bass / SPL');
                state.ratings['Flatness Index'] = selectDataFromArray(grouped)('Flatness Index');
                state.ratings['Preference Index'] = selectDataFromArray(grouped)('Preference Index');
                // console.log(calculateAllDevicesRatings(devices, measurements))
                
                const ratingsAllDevices = {'xs': calculateAllDevicesRatings(devices, current(state.measurements))}
    
                state.ratingsAllDevices['SPL'] = selectDataFromArray(ratingsAllDevices)('SPL');
                state.ratingsAllDevices['Bass Performance'] = selectDataFromArray(ratingsAllDevices)('Bass Performance');
                state.ratingsAllDevices['SPL Performance'] = selectDataFromArray(ratingsAllDevices)('SPL Performance');
                state.ratingsAllDevices['Bass / SPL'] = selectDataFromArray(ratingsAllDevices)('Bass / SPL');
                state.ratingsAllDevices['Flatness Index'] = selectDataFromArray(ratingsAllDevices)('Flatness Index');
                state.ratingsAllDevices['Preference Index'] = selectDataFromArray(ratingsAllDevices)('Preference Index');
            })
            .addCase(updateMeasurement.rejected, (state, action) => {
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

        return { data, devices }
})

export const getMeasurementById = createAsyncThunk(
    'measurements/getMeasurementById', 
    async (id, thunkAPI) => {
        const { devices: { devices }, measurements: { measurements } } = thunkAPI.getState();

        const isExist = measurements.findIndex(measurement => measurement.id === id);

        if (isExist === -1) {
            const data = await httpGetMeasurementById(id);

            return { data, devices }
        } else {
            return 0;
        }
})

export const updateMeasurement = createAsyncThunk(
    'measurements/updateMeasurement', 
    async (id, thunkAPI) => {
        const { devices: { devices } } = thunkAPI.getState();

        const data = await httpGetMeasurementById(id);

        return { data, devices }

})

export const deleteMeasurement = createAsyncThunk(
    'measurements/deleteMeasurement', 
    async (id, thunkAPI) => {
        const { devices: { devices } } = thunkAPI.getState();

        const isExist = devices.findIndex(device => device.id === id);

        if (isExist === -1) {
            return id;
        } else
            return 0
})

export const { setFilter } = measurementsSlice.actions;

export default measurementsSlice.reducer;


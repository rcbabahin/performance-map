import { createSlice } from '@reduxjs/toolkit';
import { calculateGroupedBySize, selectDataFromArray } from '../utils/calculations.js';

const initialState = {
    groupedBySizeDevices: {},
    ratings: {

    },
    filter: {
        rating: 'SPL',
        company: '',
        category: 'All'
    },
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
}

const ratingsSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {
        setFilter(state, action) {
            const { rating, company, category } = action.payload;

            // state.filter = {
            //     rating,
            //     company,
            //     category
            // }
        },
        calculateRatings(state, action) {
            // const { devices, measurements } = action.payload;
            console.log('devices', state.devices.devices)
            console.log('measurements   ', state.measurements.measurements)
            const grouped = calculateGroupedBySize(state.devices.devices, state.measurements.measurements);

            state.ratings['SPL'] = selectDataFromArray(grouped)('SPL');
            state.ratings['Bass Performance'] = selectDataFromArray(grouped)('Bass Performance');
            state.ratings['SPL Performance'] = selectDataFromArray(grouped)('SPL Performance');
            state.ratings['Bass / SPL'] = selectDataFromArray(grouped)('Bass / SPL');
            state.ratings['Flatness Index'] = selectDataFromArray(grouped)('Flatness Index');
            state.ratings['Preference Index'] = selectDataFromArray(grouped)('Preference Index');

            state.groupedBySizeDevices = grouped;

            state.status = 'succeded'
        },
    },
    // extraReducers: (builder) => {
       
    //     builder
    //         .addCase(getDevices.pending, (state, action) => {
    //             state.status = 'loading'
    //         })
    //         .addCase(getDevices.fulfilled, (state, action) => {
    //             state.status = 'succeded'
    //             state.devices = action.payload;

    //             const companies = Array.from(new Set(action.payload.map(({ company }) => company)));
    //             state.companies = companies;
    //             state.filter.company = companies[0];

    //             const filteredDevices = getFilteredDevices(action.payload, { company: companies[0], category: 'All' });
    //             state.filter.devices = filteredDevices;
    //             state.currentDeviceId = filteredDevices[0].id;
    //         })
    //         .addCase(getDevices.rejected, (state, action) => {
    //             state.status = 'failed'
    //             state.error = action.error.message
    //         })
    // },
})

export const { setFilter, calculateRatings } = ratingsSlice.actions;

export default ratingsSlice.reducer;


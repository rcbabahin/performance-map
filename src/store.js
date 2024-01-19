import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './reducers/devices.js'
import measurementsReducer from './reducers/measurements.js';
import compareReducer from './reducers/compare.js';
// import { logger } from 'redux-logger';

const store = configureStore({
    reducer: {
        devices: devicesReducer,
        measurements: measurementsReducer,
        compare: compareReducer,
    },
});

export default store;
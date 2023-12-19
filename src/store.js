import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './reducers/devices.js'
import measurementsReducer from './reducers/measurements.js';
import { logger } from 'redux-logger';

const store = configureStore({
    reducer: {
        devices: devicesReducer,
        measurements: measurementsReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
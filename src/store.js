import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './reducers/devices.js'
import measurementsReducer from './reducers/measurements.js';
import ratingsReducer from './reducers/ratings.js';
// import { logger } from 'redux-logger';

const store = configureStore({
    reducer: {
        devices: devicesReducer,
        measurements: measurementsReducer,
        ratings: ratingsReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
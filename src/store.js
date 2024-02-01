import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.js'
import devicesReducer from './reducers/devices.js'
import measurementsReducer from './reducers/measurements.js';
import compareReducer from './reducers/compare.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        devices: devicesReducer,
        measurements: measurementsReducer,
        compare: compareReducer,
    },
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './reducers/devices.js'
import { logger } from 'redux-logger';

const store = configureStore({
    reducer: {
        devices: devicesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
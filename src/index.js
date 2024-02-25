import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';

import './styles/index.scss';
import App from './App.js';
import Info from './components/Info/Info.js';
import ErrorPage from "./components/Error/ErrorPage.js";
import Home from './components/Home/Home.js';
import PanelForm from './components/PanelForm/PanelForm.js';
import Calculations from './components/Calculations/Calculations.js';
import RatingsBySize from './components/Ratings/RatingsBySize.js';
import RatingsAllDevices from './components/Ratings/RatingsAllDevices.js';
import Compare from './components/Compare/Compare.js';
import Devices from './components/Devices/Devices.js';
import EditDeviceForm from './components/Devices/EditDeviceForm.js'

import store from './store.js';
import { getDevices } from './reducers/devices.js';
import { getMeasurements } from './reducers/measurements.js';

store.dispatch(getDevices());
store.dispatch(getMeasurements());

const router = createBrowserRouter([  
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'add-new-device',
                element: <PanelForm />
            },
            {
                path: 'calculations',
                element: <Calculations />
            },
            {
                path: 'ratings-all-devices',
                element: <RatingsAllDevices />
            },
            {
                path: 'ratings-by-size',
                element: <RatingsBySize />
            },
            {
                path: 'info',
                element: <Info />
            },
            {
                path: 'compare',
                element: <Compare />
            },
            {
                path: 'devices',
                element: <Devices />
            },
            {
                path: 'edit-device',
                element: <EditDeviceForm />
            },
            
        ],
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


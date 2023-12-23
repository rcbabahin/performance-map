import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';

import './styles/index.scss';
import App from './App.js';
import ErrorPage from "./components/ErrorPage.js";
import Home from './components/Home.js';
import PanelForm from './components/PanelForm/PanelForm.js';
import store from './store.js';
import Calculations from './components/Calculations/Calculations.js';
import Compare from './components/Compare/Compare.js';
import { getDevices } from './reducers/devices.js';
import { getMeasurements } from './reducers/measurements.js';

// store.dispatch(getDevices());
// store.dispatch(getMeasurements());

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
                path: 'compare',
                element: <Compare />
            },
            {
                path: 'info',
                element: <div>Nothings here</div>
            },
        ],
        errorElement: <ErrorPage />,
    },
],
{
    basename: '/performance-map'
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

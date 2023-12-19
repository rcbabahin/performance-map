
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { httpPostDevice, httpGetDevices, httpGetMeasurements } from '../utils/utils.js';

const getFilteredDevices = (devices, filter) => {
    const categoriesObj = {
        'All': 'All',
        'Extra Small': 'xs',
        'Small': 's',
        'Medium': 'm',
        'Large': 'l',
        'Extra Large': 'xl'
    }

	if (!devices.length) return []
	return devices.filter(({ company, category }) => company === filter.company && (filter.category === 'All' || category === categoriesObj[filter.category]))
}

const initialState = {
    devices: [],
    companies: [],
    filter: {
        company: '',
        category: 'All',
        devices: []
    },
    currentDeviceId: 0,
    categories: ['All', 'Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        setFilter(state, action) {
            const { company, category } = action.payload;
            const devices = getFilteredDevices(state.devices, { company, category })

            state.filter = {
                company,
                category,
                devices
            }

            if (devices.length) state.currentDeviceId = devices[0].id;
            else state.currentDeviceId = 0;
        },
        setCurrentDeviceId(state, action) {
            state.currentDeviceId = action.payload;
        }
    },
    extraReducers: (builder) => {
       
        builder
            .addCase(getDevices.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getDevices.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.devices = action.payload;

                const companies = Array.from(new Set(action.payload.map(({ company }) => company)));
                state.companies = companies;
                state.filter.company = companies[0];

                const filteredDevices = getFilteredDevices(action.payload, { company: companies[0], category: 'All' });
                state.filter.devices = filteredDevices;
                state.currentDeviceId = filteredDevices[0].id;
            })
            .addCase(getDevices.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            .addCase(registerDevice.pending, (state, action) => {
                state.status = 'loading';
            }) 
            .addCase(registerDevice.fulfilled, (state, action) => {
                state.status = 'succeded';
            })
            .addCase(registerDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    },
})

// export const selectCompanies = state => state.devices.companies

export const registerDevice = createAsyncThunk(
    'devices/registerDevice',
    async (device) => {
        return await httpPostDevice(device)
    }
)

export const getDevices = createAsyncThunk(
    'devices/getDevices', 
    async () => {
    return await httpGetDevices()
})

export const { setFilter, setCurrentDeviceId } = devicesSlice.actions;

export default devicesSlice.reducer;


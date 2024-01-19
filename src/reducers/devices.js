
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, current } from '@reduxjs/toolkit';
import { 
    httpPostDevice, 
    httpGetDevices, 
    httpPutDevice,
    httpDeleteDevice
} from '../utils/network.js';

const getFilteredDevices = (devices, filter) => {
    const categoriesObj = {
        'All': 'All',
        'Mini': 'xs',
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
    categoriesArray: ['All', 'Mini', 'Small', 'Medium', 'Large', 'Extra Large'],
    categoriesObject: {
        'All': 'All',
        'xs': 'Mini',
        's': 'Small',
        'm': 'Medium',
        'l': 'Large',
        'xl': 'Extra Large'
    },
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
        },
        addDevicesOption(state, action) {
            const { optionName, optionValue } = action.payload;
            state.devices = state.devices.map(device => {
                device[optionName] = optionValue;
                return device
            })
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
                state.companies = ['All', ...companies];
                state.filter.company = companies[0];

                const filteredDevices = getFilteredDevices(action.payload, { company: companies[0], category: 'All' });

                if (filteredDevices.length) {
                    state.filter.devices = filteredDevices;
                    state.currentDeviceId = filteredDevices[0].id;
                }
            })
            .addCase(getDevices.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            .addCase(registerDevice.pending, (state, action) => {
                state.status = 'loading';
            }) 
            .addCase(registerDevice.fulfilled, (state, action) => {
                let [ id, device ] = action.payload;

                device.id = id;
                device.size = +device.size;
                delete device.measurements;

                const companyIndex = state.companies.findIndex(item => item === device.company);

                if (companyIndex === -1) {
                    state.companies.push(device.company);
                }

                state.devices.push(device)

                state.status = 'succeded';
            })
            .addCase(registerDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

            .addCase(updateDevice.pending, (state, action) => {
                state.status = 'loading';
            }) 
            .addCase(updateDevice.fulfilled, (state, action) => {
                const [ deviceId, device ] = action.payload;

                const idIndex = current(state.devices).findIndex(device => device.id === deviceId);

                if (idIndex > -1) {
                    state.devices[idIndex].name = device.name;
                    state.devices[idIndex].company = device.company;
                    state.devices[idIndex].size = +device.size;
                    state.devices[idIndex].category = device.category;
                } else {
                    console.log('something went wrong')
                }

                state.status = 'succeded';
            })
            .addCase(updateDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteDevice.pending, (state, action) => {
                state.status = 'loading';
            }) 
            .addCase(deleteDevice.fulfilled, (state, action) => {
                const deviceId = action.payload;

                const idIndex = state.devices.findIndex(device => device.id === deviceId);
                const company = state.devices[idIndex].company;

                state.devices.splice(idIndex, 1);

                const companyIndex = state.companies.findIndex(item => item === company);

                state.companies.splice(companyIndex, 1);
                
                state.status = 'succeded';
            })
            .addCase(deleteDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    },
})

export const selectCompanies = state => state.devices.companies;
export const selectSizeCategoriesObject = state => state.devices.categoriesObject;
export const selectSizeCategoriesArray = state => state.devices.categoriesArray;
export const selectDevicesStatus = state => state.devices.status;
export const selectDevciesError = state => state.devices.error;
export const selectDevicesFilter = state => state.devices.filter;
export const selectCurrentDeviceId = state => state.devices.currentDeviceId;
export const selectDevices = state => state.devices.devices;
export const selectLastDeviceId = state => {
    if (state.devices.devices.length) {
        return state.devices.devices[state.devices.devices.length - 1].id
    } else 
        return 0
}

export const registerDevice = createAsyncThunk(
    'devices/registerDevice',
    async (device) => {
        return [ await httpPostDevice(device), device ]
    }
)

export const updateDevice = createAsyncThunk(
    'devices/updateDevice', 
    async (device) => {
    return [ await httpPutDevice(device), device ]
})

export const getDevices = createAsyncThunk(
    'devices/getDevices', 
    async () => {
    return await httpGetDevices()
})

export const deleteDevice = createAsyncThunk(
    'devices/deleteDevice', 
    async (id) => {
    return await httpDeleteDevice(id)
})

export const { setFilter, setCurrentDeviceId, addDevicesOption } = devicesSlice.actions;

export default devicesSlice.reducer;


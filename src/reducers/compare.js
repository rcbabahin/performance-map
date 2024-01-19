import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    filteredDevices: [],
    currentCompany: 'All',
    graph: {
        bass: { data: [] },
        spl: { data: [], weight: 'Z' },
        thd: { data: [] }
    }
}

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        setCompany(state, action) {
            const { devices, company } = action.payload;

            state.currentCompany = company;

            state.filteredDevices = devices.filter(device => {
                if (company === 'All') {
                    return true;
                } else {
                    return device.company === company;
                }
            });
        },
        handleActiveDevice(state, action) {
            const { id, measurements, name } = action.payload;

            const idIndex = current(state.graph.bass.data).findIndex(item => item.id === id);

            // add device to the data array
            if (idIndex === -1) {

                const { bass, weights } = measurements.find(m => m.id === id);
                    
                const bassData = [
                    {Hz: bass['-10dB'].freq, SPL: bass['-10dB'].SPL.toFixed(2)},
                    {Hz: bass['-3dB'].freq, SPL: bass['-3dB'].SPL.toFixed(2)},
                    {Hz: bass['0dB'].freq, SPL: bass['0dB'].SPL.toFixed(2)},
                ];
                const thdData = weights.filter(w => w.THD > 0);

                state.graph.bass.data.push({ items: bassData, name, id });
                state.graph.spl.data.push({ items: weights, name, id });
                state.graph.thd.data.push({ items: thdData, name, id })
            } 
            // delete device from data array
            else {
                state.graph.bass.data.splice(idIndex, 1);
                state.graph.spl.data.splice(idIndex, 1);
                state.graph.thd.data.splice(idIndex, 1);
            } 
        },
        setSPLWeight(state, action) {
            const { weight } = action.payload;

            state.graph.spl.weight = weight;
        }
    },
})

export const selectFilteredDevices = state => state.compare.filteredDevices;
export const selectCurrentCompany = state => state.compare.currentCompany;
export const selectBassGraphData = state => state.compare.graph.bass.data;
export const selectSPLGraphData = state => state.compare.graph.spl.data;
export const selectTHDGraphData = state => state.compare.graph.thd.data;
export const selectSPLWeight = state => state.compare.graph.spl.weight

export const { setCompany, handleActiveDevice, setSPLWeight } = compareSlice.actions;

export default compareSlice.reducer;


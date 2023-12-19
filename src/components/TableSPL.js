
import { calculateBassSPL, calculateWeightedSPLAndTHD } from "../utils/calculations.js";

import GraphSPL from "./GraphSPL.js";
import Table from "./Table.js";

function TableSPL({ data, deviceName }) {
    const bass = calculateBassSPL(data);
    const averageSPL = bass['0dB'].SPL;
    const cornerFreq = bass['-10dB'].freq;

    const calculatedData = calculateWeightedSPLAndTHD(data, cornerFreq);     
console.log(calculatedData);
    const categories = Object.keys(calculatedData[0]);
    const categoriesHeader = categories.map(cat => cat === 'freq' ? '1/3 octave [Hz]' : `${cat} [dB]`);
    
    const graphData = calculatedData.map(item => ({ freq: item.freq, Z: item.Z, A: item.A, C: item.C }));
    const rawData = data.map(d => ({ freq: d['Freq[Hz]'], raw: d['CHB[dBSPL]'] }));
    const THDData = calculatedData.map(item => ({ freq: item.freq, THD: item.THD })).filter(item => item.THD > 0);

    const logSum = THDData.reduce((acc, val) => acc + Math.log(val.THD), 0)
    const geoMeanTHD = Math.exp(logSum / THDData.length).toFixed(2);
    const THDPercentages = (Math.pow(10, (geoMeanTHD - bass['Bandwidth SPL']) / 20) * 100).toFixed(2);

    calculatedData.push({ freq: 0, Z: 0, A: 0, C: 'THD %', THD: THDPercentages})

    return (
        <div>
            <span className="table-name">SPL Max </span>
            <Table 
                data={calculatedData}
                categoriesHeader={categoriesHeader} 
                categoriesRow={categories}
                tableIndex={0}
                handleSortByCategory={e => {}}
                handleEditCellSubmit={e => {}} 
            />
            <GraphSPL 
                name={deviceName} 
                rawData={rawData} 
                graphData={graphData} 
                THDData={THDData}
                averageSPL={averageSPL}
            />
        </div>
    );
}

export default TableSPL;
import GraphSPL from "../Graphs/GraphSPL.js";
import Table from "../Table/Table.js";

function TableSPL({ data }) {
    const { bass, items, weights } = data;

    const weightsData = structuredClone(weights);

    const categories = Object.keys(weightsData[0]);
    const categoriesHeader = categories.map(cat => cat === 'freq' ? '1/3 octave [Hz]' : `${cat} [dB]`);
    
    const graphData = weightsData.map(item => ({ freq: item.freq, Z: item.Z, A: item.A, C: item.C }));
    const rawData = items.map(d => ({ freq: d['Freq[Hz]'], raw: d['CHB[dBSPL]'] }));
    const THDData = weightsData.map(item => ({ freq: item.freq, THD: item.THD })).filter(item => item.THD > 0);

    const logSum = THDData.reduce((acc, val) => acc + Math.log(val.THD), 0)
    const geoMeanTHD = Math.exp(logSum / THDData.length).toFixed(2);
    const THDPercentages = (Math.pow(10, (geoMeanTHD - bass['Bandwidth SPL']) / 20) * 100).toFixed(2);

    weightsData.push({ freq: 0, Z: 0, A: 0, C: 'THD %', THD: THDPercentages})

    return (
        <div>
            <span className="table-name">SPL Max </span>
            <Table 
                data={weightsData}
                categoriesHeader={categoriesHeader} 
                categoriesRow={categories}
            />
            <GraphSPL 
                rawData={rawData} 
                graphData={graphData} 
                THDData={THDData}
                averageSPL={bass['0dB'].SPL}
            />
        </div>
    );
}

export default TableSPL;
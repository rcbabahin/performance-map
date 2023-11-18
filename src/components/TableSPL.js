import { calculateBassSPL, calculateWeightedSPLAndTHD } from "../utils/calculations.js";
import TableHeader from "./TableHeader.js";
import TableRow from "./TableRow.js";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

function TableSPL({ data }) {

    const handleSortByCategory = (c, i) => (e) => {

    }

    const handleEditCellSubmit = (c, i) => (e) => {

    }

    const bass = calculateBassSPL(data);
    const cornerFreq = bass['-10dB'].freq;
    const calculatedData = calculateWeightedSPLAndTHD(data, cornerFreq);     
    const categories = Object.keys(calculatedData[0]);
    const categoriesHeader = categories.map(cat => cat === 'freq' ? '1/3 octave [Hz]' : `${cat} [dB]`);
    
    const ZData = calculatedData.map(item => ({ freq: item.freq, Z: item.Z }))
    const THDData = calculatedData.map(item => ({ freq: item.freq, THD: item.THD })).filter(item => item.THD > 0);

    const logSum = THDData.reduce((acc, val) => acc + Math.log(val.THD), 0)
    const geoMeanTHD = Math.exp(logSum / THDData.length).toFixed(2);
    const THDPercentages = (Math.pow(10, (geoMeanTHD - bass['Bandwidth SPL']) / 20) * 100).toFixed(2);

    calculatedData.push({ freq: 0, Z: 0, A: 0, C: 'THD %', THD: THDPercentages})

    return (
        <div>
            <span className="table-name">SPL Max </span>
            <div className='xl-table'>
                <TableHeader 
                    categories={categoriesHeader}
                    tableIndex={0}
                    handleSortByCategory={handleSortByCategory}
                />
                <TableRow 
                    data={calculatedData}
                    tableIndex={0}
                    categories={categories} 
                    handleEditCellSubmit={handleEditCellSubmit} 
                />
            </div>
            <LineChart width={900} height={400} style={{width: '950px', margin: '50px auto'}}>
                <Line data={ZData} type="monotone" dataKey="Z" stroke="#8884d8"  strokeWidth={2} />
                <Line data={THDData} type="monotone" dataKey="THD" stroke="#3498db"  strokeWidth={2} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"  />
                <XAxis ticks={logAxis} interval={0} type="number" domain={[10,20000]} dataKey="freq" scale="log" tickSize='12' angle='45' />
                <YAxis domain={[0, 120]} />
                <Tooltip />
            </LineChart>
        </div>
    );
}

export default TableSPL;

const logAxis = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000
]
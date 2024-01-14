
import GraphBass from "../Graphs/GraphBass.js";

function TableBass({ data }) {
    const { bass } = data;
        
    const bassGraphData = [
        {Hz: bass['-10dB'].freq, SPL: bass['-10dB'].SPL.toFixed(2)},
        {Hz: bass['-3dB'].freq, SPL: bass['-3dB'].SPL.toFixed(2)},
        {Hz: bass['0dB'].freq, SPL: bass['0dB'].SPL.toFixed(2)},
    ]
    
    const tableHeader = ['-10dB [Hz]', '-3dB [Hz]', '0dB [Hz]', 'Bandwidth SPL [dB]'];
    const tableRow = [bass['-10dB'].freq, bass['-3dB'].freq, bass['0dB'].freq, bass['Bandwidth SPL'].toFixed(2)];

    return (
        <div>
            <span className="table-name">Corner Frequencies</span>
            <div className="table-bass">
                <div className="table-bass-header-item"></div>
                { tableHeader.map((item) => 
                    <div key={item} className="table-bass-header-item" >
                        {item}
                    </div>	
                )}
    
                <div>20 Hz - 20 kHz</div>

                { tableHeader.map((item, index) => {
                    if(index === tableHeader.length - 1) return <div key={index}>{bass['0dB'].SPL.toFixed(2)}</div>	
                    else return <div key={index}></div>	
                })}

                <div>{`${bass['-10dB'].freq} Hz`} - 20 kHz</div>

                { tableRow.map((item, index) => 
                    <div key={`${item}${index}`} >
                        {item}
                    </div>	
                )}
            </div>
            <GraphBass graphData={bassGraphData} averageSPL={bass['0dB'].SPL} />
        </div>
    );
}

export default TableBass;



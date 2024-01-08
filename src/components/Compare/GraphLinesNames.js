import { getColor } from "../../utils/utils.js";

function GraphLinesNames({ selectedDevices }) {

    return (
        <div className="devices-graph-lines-names">
            {
                selectedDevices.map(device => {
                    const stroke = <svg>
                        <path strokeWidth="4" fill="none" stroke={getColor(device.name)} d="M0,16h10.666666666666666
                        A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
                        H32M21.333333333333332,16
                        A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path>
                    </svg>
                    const name = <span style={{ color: getColor(device.name) }}>{device.name}</span>

                    return <div className="devices-graph-lines-names-item" key={device.name}>
                        {stroke}
                        {name}
                    </div>
                })
            }
        </div>
    );
}

export default GraphLinesNames;

import { getColor } from "../../utils/utils.js";

function DevicesList({ allDevices, selectedDevices, handleClick }) {

    return (
        <div className="filter-box">
            {
                allDevices.map(device => {

                    const isSelected = selectedDevices.findIndex(item => item.id === device.id);

                    return <div 
                                key={device.id} 
                                className={`filter-box-item ${isSelected > -1 ? 'active' : ''}`}
                                style={{ color: isSelected > -1 ? getColor(device.name) : '' }}
                                onClick={handleClick(device.id)}
                            >
                                {device.name}
                            </div>	
                })
            }
        </div>
    );
}

export default DevicesList;

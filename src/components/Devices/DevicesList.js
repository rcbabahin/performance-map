import DevicesListItem from "./DeviceListItem.js";

function DevicesList({ devices }) {

    return (
        <div className="devices-list">
            {
                devices.map(device => (
                    <DevicesListItem key={device.id} {...device} />
                ))
            }
        </div>
    )
}

export default DevicesList;
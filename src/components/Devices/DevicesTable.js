import DevicesTableItem from "./DevicesTableItem.js";

function DevicesTable({ devices }) {

    return (
        <div className="devices-table">
            {
                devices.map(device => (
                    <DevicesTableItem key={device.id} {...device} />
                ))
            }
        </div>
    )
}

export default DevicesTable;
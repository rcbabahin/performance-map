import { useSelector } from "react-redux";

function Compare() {
    const devices = useSelector(state => state.devices.devices);
    const measurements = useSelector(state => state.measurements.measurements)
    const groupedBySize = {
        'xs': {
            items: []
        },
        's': {
            items: []
        },
        'm': {
            items: []
        },
        'l': {
            items: []
        },
        'xl': {
            items: []
        },        
    }

    const updatedDevices = devices.map(device => {
       const temp = measurements.find(meas => meas.id === device.id);

       return { ...device, bass: temp.bass, flatnessIndex: temp.flatnessIndex }
    })

    updatedDevices.map(device => {
        groupedBySize[device.category].items.push(structuredClone(device))
    })

    for (let key in groupedBySize) {
        let averageSPL = 0;
        let averageSize = 0;
        let averageBass = 0;

        groupedBySize[key].items.map(device => {
            averageSPL += device.bass['Bandwidth SPL']
            averageSize += device.size;
            averageBass += device.bass['-10dB'].SPL
        })

        averageSPL = groupedBySize[key].items.length ? (averageSPL / groupedBySize[key].items.length) : 0;

        const dBPercentage = [];
        const sizePercentage = [];
        const bassPercentage = [];

        groupedBySize[key].items.map(device => {
            dBPercentage.push((Math.pow(10, ((device.bass['Bandwidth SPL'] - averageSPL) / 20))) * 100)
            sizePercentage.push((100 * device.size) / averageSize);
            bassPercentage.push((100 * device.bass['-10dB'].SPL) / averageBass);
        })

        const ratingsMultipliers = {
            spl: 4.4,
            point: 6,
            size: 3.6,
            flatness: 6,
            generalMult: 12.68
        }

        groupedBySize[key].items.map((device, i) => {
            device['SPL Performance'] = dBPercentage[i] / sizePercentage[i];
            device['Bass Performance'] = bassPercentage[i] / sizePercentage[i];
            device['Bass / SPL'] = device.bass['0dB'].SPL / device.bass['-10dB'].freq;

            const part1 = ratingsMultipliers.generalMult;
            console.log('part1',part1)
            const part2 = ((1 / device.bass['0dB'].SPL) * 100) * ratingsMultipliers.spl;
            console.log('part2',part2)
            const part3 = ((1 / device.bass['-10dB'].freq) * 100) * ratingsMultipliers.point;
            console.log('part3',part3)
            const part4 = Math.log10(device.size * 10) * ratingsMultipliers.size;
            console.log('part4',part4)
            const part5 = (1 / device.flatnessIndex) * ratingsMultipliers.flatness;
            console.log('part5',part5)
            device['Preference Index'] = (part1 - part2 + part3 - part4 + part5) / 2;
        })

        groupedBySize[key].averageSPL = averageSPL;


        
    }

    


    console.log(groupedBySize)
    return (
        <div>

        </div>
    );
}

export default Compare;
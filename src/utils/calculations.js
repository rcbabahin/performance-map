const START_FREQ = 20.24;
const END_FREQ = 20241.84;
const ONE_THIRD_OCTAVE_FREQ = 17.78;
const ONE_THIRD_OCTAVE_NUM = 31;

const findCornerFrequency = (arr, freqKey, splKey, spl) => Math.floor(arr.find(item => item[splKey] >= spl)[freqKey]);

export const calculateSPLInRange = (splArr, splKey) => {
    const sum = splArr
        .map(item => Math.pow(10, (item[splKey] / 10)))
        .reduce((sum, current) => sum + current, 0);

    return 10 * Math.log10(sum / splArr.length);
}

export const calculateBassSPL = (file) => {
    const bass = {
        '0dB': {
            SPL: 0,
            freq: 0
        },
        '-3dB': {
            SPL: 0,
            freq: 0
        },
        '-10dB': {
            SPL: 0,
            freq: 0
        },
        'Bandwidth SPL': 0
    };
    // save key's name for frequency and SPL from raw data array
    const [ freq, spl ] = Object.keys(file[0]);
    // filter raw data array to start from 20.24 Hz to 20241.84 Hz
    const filteredFile = file.filter(item => item[freq] >= START_FREQ && item[freq] <= END_FREQ);
    // calclulate average SPL of 20-20kHz bandwidth
    bass['0dB'].SPL = calculateSPLInRange(filteredFile, spl);
    bass['-3dB'].SPL = bass['0dB'].SPL - 3;
    bass['-10dB'].SPL = bass['0dB'].SPL - 10;
    // find frequency where corresponding SPL value appears for three dB points
    bass['-10dB'].freq = findCornerFrequency(filteredFile, freq, spl, bass['-10dB'].SPL);
    bass['-3dB'].freq = findCornerFrequency(filteredFile, freq, spl, bass['-3dB'].SPL);
    bass['0dB'].freq = findCornerFrequency(filteredFile, freq, spl, bass['0dB'].SPL);
    // reduce array of raw data to start from -10dB point frequency to 20241.84 Hz
    const reducedFreqRangeFile = filteredFile.filter(item => item[freq] > bass['-10dB'].freq);
    // calclulate average SPL of -10dB point frequency-20kHz bandwidth
    bass['Bandwidth SPL'] = calculateSPLInRange(reducedFreqRangeFile, spl);

    return bass;
}

export const calculateWeightedSPLAndTHD = (file, cornerFreq) => {
    // save key's name for frequency, SPL and THD from raw data array
    const [ freq, spl, phase, thd ] = Object.keys(file[0]);
    // add THD calculations to raw data array and reduce bandwidth of data to 17.78-22387.21 Hz
    const oneThirdOctaveFile = file
        .filter(item => item[freq] >= ONE_THIRD_OCTAVE_FREQ)
        .map(item => {
            item['THD[dB]'] = (20 * Math.log10(item[thd] / 100)) + item[spl];
            return item;
        });

    const octaveArr = [];
    // divide raw data array to 31 pcs of 17 frequency values and save to octaveArr
    for (let i = 0; i < ONE_THIRD_OCTAVE_NUM; i++) {
        if (i === (ONE_THIRD_OCTAVE_NUM - 1)) octaveArr.push(oneThirdOctaveFile.slice(i * 16, i * 16 + 10))
        else octaveArr.push(oneThirdOctaveFile.slice(i * 16, i * 16 + 17))
    }

    // octaveArr consist of 31 elements, but we should return THD values not for full bandwidth
    // but only for -10dB corner frequency - 10 kHz bandwidth
    // so 27 is array index where 10kHz is located
    // and we should find array index where -10dB corner frequency is located 
    let THDStartIndex = 0;
    const THDEndIndex = 27;

    for (let i = 0; i < octaveArr.length; i++) {
        let find = false;

        for (let j = 0; j < octaveArr[i].length; j++) {
            if (octaveArr[i][j][freq] >= cornerFreq) {
                find = true;
                break;
            }
        }

        if (find) {
            THDStartIndex = i;
            break;
        }

    } 
    // calculate THD for -10dB corner frequency - 10 kHz bandwidth rest of the values are 0
    const calculatedTHD = octaveArr.map((item, index) => {
        // here 'item' is array of 17 values 
        // and we should get average SPL in that range
        // but only for 10dB corner frequency - 10 kHz bandwidth
        if (index >= THDStartIndex && index < THDEndIndex) return calculateSPLInRange(item, 'THD[dB]');
        // for last element where 10kHz is located we should reduce array length because 10kHz is not last element
        else if (index === THDEndIndex) return (calculateSPLInRange(item.filter(el => el[freq] <= 10000), 'THD[dB]')) 
        else return 0;
    });

    const ZWeightSPL = octaveArr.map(item => calculateSPLInRange(item, spl));

    return ZWeightSPL.map((item, index) => ({
        freq: oneThirdOctaveFreq[index].toFixed(2),
        Z: item.toFixed(2),
        A: item + weightA[index] > 0 ? (item + weightA[index]).toFixed(2) : 0,
        C: (item + weightC[index]).toFixed(2),
        THD: calculatedTHD[index].toFixed(2)
    }));
}

const oneThirdOctaveFreq = [
    20,
    25,
    31.5,
    40,
    50,
    63,
    80,
    100,
    125,
    160,
    200,
    250,
    315,
    400,
    500,
    630,
    800,
    1000,
    1250,
    1600,
    2000,
    2500,
    3150,
    4000,
    5000,
    6300,
    8000,
    10000,
    12500,
    16000,
    20000
]

const weightA = [
    -50.5,
    -44.7,
    -39.4,
    -34.6,
    -30.2,
    -26.2,
    -22.5,
    -19.1,
    -16.1,
    -13.4,
    -10.9,
    -8.6,
    -6.6,
    -4.8,
    -3.2,
    -1.9,
    -0.8,
    0,
    0.6,
    1,
    1.2,
    1.3,
    1.2,
    1,
    0.5,
    -0.1,
    -1.1,
    -2.5,
    -4.3,
    -6.6,
    -9.3,
]

const weightC = [
    -6.2,
    -4.4,
    -3,
    -2,
    -1.3,
    -0.8,
    -0.5,
    -0.3,
    -0.2,
    -0.1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    -0.1,
    -0.2,
    -0.3,
    -0.5,
    -0.8,
    -1.3,
    -2,
    -3,
    -4.4,
    -6.2,
    -8.5,
    -11.2,
]
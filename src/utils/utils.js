export const csvToJson = (csv) => {
    let rows = csv.split('\n');

    if (rows[0].includes('\r'))
        rows = rows.map(row => row.slice(0, -1))
    // define field delimiter, four options are available: comma, semicolon, space and tab
    const fieldDelimiter = rows[0].includes(',') ? ',' : rows[0].includes(';') ? ';' : rows[0].includes('\t') ? '\t' : ' ';
    
    // clio data are only numbers, there are no strings in it
    // so string delimiter exist only when we use field delimiter == ',' and have ',' as float number delimiter
    // define string delimiter, but if there are no float number in first row there will be an error
    const stringDelimiter = rows[1].includes('\'') ? '\'' : rows[1].includes('"') ? '"' : 'no string in row';

    if (stringDelimiter !== 'no string in row') {
        // regexp to find and replace comma (,) symbol in float numbers with * symbol
        const regexp = new RegExp(`${stringDelimiter}(.*?),(.*?)${stringDelimiter}`, 'g');
        // update rows array with replaced comma symbol in float numbers 
        rows = rows.map(row => row.replace(regexp, (match, p1, p2) => `${p1}.${p2}`));
    }

    const header = rows[0].split(fieldDelimiter);

    const json = [];

    for (let i = 1; i < rows.length - 1; i++) {
        const values = rows[i].split(fieldDelimiter);

        const obj = {};

        for (let j = 0; j < header.length; j++) {
            obj[header[j]] = parseFloat(values[j].replace(',', '.'));
        }

        json.push(obj);
    }

    return json;
};

const API_ROOT = 'http://localhost:3001';
 
export const httpPostDevice = async (device) => {
    try {
        const response = await fetch(`${API_ROOT}/register`, {  
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'x-access-token': auth.getBackendToken()
            },
            body: JSON.stringify(device)
        });
        
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(await response.json());            
        }
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }
}

export const httpGetDevices = async () => {
    try {
        const response = await fetch(`${API_ROOT}/devices`);
        
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(await response.json());            
        }
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }
}

export const httpPutDevice = async (device) => {
    try {
        const response = await fetch(`${API_ROOT}/devices`);
        
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(await response.json());            
        }
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }
}

export const httpDeleteDevice = async (id) => {
    try {
        const response = await fetch(`${API_ROOT}/device/${id}`, {  
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'x-access-token': auth.getBackendToken()
            },
        });
        
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(await response.json());            
        }
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }
}

export const httpGetMeasurements = async () => {
    try {
        const response = await fetch(`${API_ROOT}/measurements`);
        
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(await response.json());            
        }
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }
}


export const getColor = (name) => {
    let hashCode = 0;

    for (let i = 0; i < name.length; i++) {
        hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hashCode >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).slice(-2);
    }

    return color;
}

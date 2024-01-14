// const API_ROOT = 'http://localhost:3001';
const API_ROOT = 'https://spm-2ui0.onrender.com';
 
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
        const response = await fetch(`${API_ROOT}/device/${device.id}`, {  
            method: 'PUT',
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

export const httpGetMeasurementById = async (id) => {
    try {
        const response = await fetch(`${API_ROOT}/measurement/${id}`);
        
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
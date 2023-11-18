export const csvToJson = (csv, delimeter=';') => {
    const rows = csv.split('\r\n');
    const header = rows[0].split(delimeter);
  
    const json = [];

    for (let i = 1; i < rows.length - 1; i++) {
        const values = rows[i].split(delimeter);

        const obj = {};

        for (let j = 0; j < header.length; j++) {
            obj[header[j]] = parseFloat(values[j].toString().replace(',', '.'));
        }

        json.push(obj);
    }

    return json;
};


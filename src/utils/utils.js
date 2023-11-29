export const csvToJson = (csv) => {
    let rows = csv.split('\r\n');
    let replaceSymbol = ',';
    // define field delimiter, four options are available: comma, semicolon, space and tab
    const fieldDelimiter = rows[0].includes(',') ? ',' : rows[0].includes(';') ? ';' : rows[0].includes('\t') ? '\t' : ' ';

    if (fieldDelimiter === ',') {
        // clio data are only numbers, there are no strings in it
        // so string delimiter exist only when we use field delimiter == ','
        // define string delimiter, but if there are no float number in first row there will be an error
        const stringDelimiter = rows[1].includes('\'') ? '\'' : '"';
        // regexp to find and replace comma (,) symbol in float numbers with * symbol
        const regexp = new RegExp(`${stringDelimiter}(.*?),(.*?)${stringDelimiter}`, 'g');
        // update rows array with replaced comma symbol in folat numbers 
        rows = rows.map(r => r.replace(regexp, (match, p1, p2) => `${p1}*${p2}`));
        // change replace symbol for future needs
        replaceSymbol = '*'
    }
        
    const header = rows[0].split(fieldDelimiter);

    const json = [];

    for (let i = 1; i < rows.length - 1; i++) {
        const values = rows[i].split(fieldDelimiter);

        const obj = {};

        for (let j = 0; j < header.length; j++) {
            obj[header[j]] = parseFloat(values[j].replace(replaceSymbol, '.'));
        }

        json.push(obj);
    }

    return json;
};


const xlsx = require('xlsx');
const fs = require('fs');
const workbook = xlsx.readFile('Niche_Global_Website_Content_Design_Plan (1).xlsx');
let out = '';
for (const sheetName of workbook.SheetNames) {
    out += `Sheet: ${sheetName}\n`;
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].length > 0) {
            const rowStr = data[i].join(' | ');
            if (rowStr.trim() !== '' && rowStr.replace(/ \| /g, '').trim() !== '') {
                out += `Row ${i + 1}: ${rowStr}\n`;
            }
        }
    }
    out += '\n';
}
fs.writeFileSync('excel_output.txt', out);
console.log('Done');

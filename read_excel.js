const xlsx = require('xlsx');
const workbook = xlsx.readFile('Niche_Global_Website_Content_Design_Plan (1).xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

for (let i = 0; i < data.length; i++) {
    console.log(`Row ${i + 1}:`, data[i].join(' | '));
}

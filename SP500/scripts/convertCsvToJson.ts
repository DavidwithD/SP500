import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read CSV file
const csvPath = path.join(__dirname, '../data/sp500.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV manually (simple parser for this structure)
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

const data = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  // Handle quoted values
  const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
  
  const row: any = {};
  headers.forEach((header, index) => {
    let value = values[index]?.replace(/^"|"$/g, '').trim();
    const cleanHeader = header.trim();
    
    if (cleanHeader === 'date') {
      row[cleanHeader] = value;
    } else {
      row[cleanHeader] = parseFloat(value);
    }
  });
  
  data.push(row);
}

// Write JSON file to public/data directory
const publicDataDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}

const jsonPath = path.join(publicDataDir, 'sp500.json');
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

console.log(`✅ Converted ${data.length} records from CSV to JSON`);
console.log(`📁 Output: ${jsonPath}`);

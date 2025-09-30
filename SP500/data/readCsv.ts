import * as fs from "fs";
import * as Papa from "papaparse";
type TCsv = {
  date: Date;
  open: string;
  high: string;
  low: string;
  close: string;
  adj_close: string;
  volume: string;
};

// Function to read and parse the CSV file
function readCSV(filePath: string): Promise<TCsv[]> {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(filePath, "utf8");

    Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        resolve(result.data as TCsv[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

// Function to write data to a JSON file
function writeJSON(filePath: string, data: any): void {
  const jsonContent = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonContent, "utf8");
}

// Usage example
(async () => {
  try {
    const csvFilePath = "sp500.csv";
    const jsonFilePath = "sp500.json";

    // Read and parse the CSV file
    const content = await readCSV(csvFilePath);

    // Write the parsed data to a JSON file
    writeJSON(jsonFilePath, content);

    console.log("CSV file has been converted to JSON successfully.");
  } catch (error) {
    console.error("Error processing files:", error);
  }
})();

import { Low, JSONFile } from 'lowdb';
import createQRCode from './apis/qrCode.js';

async function generateQRCodes() {
  // Use JSON file for storage
  const file = './_data/db.json';
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  //Kill the process if db is empty
  if (Object.keys(db.data.persons).length <= 0) {
    return;
  }

  //generate QR Codes
  db.data.persons.forEach((entry) => {
    createQRCode(entry.id);
  });
}
async function runGeneration() {
  //Run data Generation.
  const starttime = Date.now();
  generateQRCodes();
  const endtime = Date.now();
  console.log('Time elapsed: ' + (endtime - starttime) / 1000 + 's.');
}

runGeneration();

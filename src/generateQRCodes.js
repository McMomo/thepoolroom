import { Low, JSONFile } from 'lowdb';
import createQRCode from './apis/qrCode.js';

async function generateQRCodes() {
  const starttime = Date.now();
  // Use JSON file for storage
  const file = './src/_data/db.json';
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  const size = Object.keys(db.data.persons).length;
  let persons = db.data.persons;

  //Kill the process if db is empty
  if (size <= 0) {
    return;
  }

  let nbr = 0;
  let char = 65; //Unicode A

  for (let i = 0; i < size; i++) {
    //Generate QR Code name
    let name = '';
    if (nbr < 10) {
      name = String.fromCodePoint(char) + '0' + nbr;
    } else {
      name = String.fromCodePoint(char) + '' + nbr;
    }

    //Create QR Code with the size of 512 & 1024
    await createQRCode(persons[i].id, 512, name);
    await createQRCode(persons[i].id, 1024, name);

    nbr++;
    if (nbr == 100) {
      nbr = 0;
      char++;
    }
  }

  //Print total generation time
  const endtime = Date.now();
  console.log('Time elapsed: ' + (endtime - starttime) / 1000 + 's.');
}

generateQRCodes();

export default generateQRCodes;

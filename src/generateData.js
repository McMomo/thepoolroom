import getPersonalData from "./apis/personalData.js";
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { timeStamp } from "console";

let totalEntries = 0;
const targetEntries = 10;

async function generateData() {
  // Use JSON file for storage
  const file = "./_data/db.json";
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  // If file.json doesn't exist, db.data will be null
  // Set default data
  db.data = db.data || { persons: [] };

  totalEntries = Object.keys(db.data.persons).length;
  console.log(
    "Total Entries: " +
      totalEntries +
      " -----> " +
      parseInt((totalEntries / targetEntries) * 100) +
      "% done."
  );
  const payload = await getPersonalData("male");

  // You can also use this syntax if you prefer
  const { persons } = db.data;
  persons.push(payload);

  // Write db.data content to db.json
  await db.write();
}

//Run dataGeneration.
const starttime = Date.now();
while (totalEntries < targetEntries) {
  await generateData();
}
const endtime = Date.now();
console.log("Time elapsed: " + (endtime - starttime) / 1000 + "s.");

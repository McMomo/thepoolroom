import getPersonalData from "./apis/personalData.js";
import { Low, JSONFile } from "lowdb";
import getFaces from "./apis/faces.js";

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

  //Check Amount of DB entries and log the result
  totalEntries = Object.keys(db.data.persons).length;
  console.log(
    "Total Entries: " +
      totalEntries +
      " -----> " +
      parseInt((totalEntries / targetEntries) * 100) +
      "% done."
  );

  //get a random face image
  const face = getFaces();

  //generate personal Data json
  //TODO: Facial Recognition
  const payload = await getPersonalData("male", 21, 56, face);

  // You can also use this syntax if you prefer
  const { persons } = db.data;
  persons.push(payload);

  // Write db.data content to db.json
  await db.write();
}

//Run data Generation.
const starttime = Date.now();
while (totalEntries < targetEntries) {
  await generateData();
}
const endtime = Date.now();
console.log("Time elapsed: " + (endtime - starttime) / 1000 + "s.");

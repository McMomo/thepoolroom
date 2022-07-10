import getPersonalData from "./apis/personalData.js";
import { Low, JSONFile } from "lowdb";
import getFaces from "./apis/faces.js";

let totalEntries = 0;
const TARGET_ENTRIES = 10;

let i = 0;

async function generateData() {
  // Use JSON file for storage
  const file = "./_data/db.json";
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();
  const starttime = Date.now();

  // If file.json doesn't exist, db.data will be null
  // Set default data
  db.data = db.data || { persons: [] };

  while (totalEntries < TARGET_ENTRIES) {
    //Check Amount of DB entries and log the result
    totalEntries = Object.keys(db.data.persons).length;
    console.log(
      "Total Entries: " +
        totalEntries +
        " -----> " +
        parseInt((totalEntries / TARGET_ENTRIES) * 100) +
        "% done."
    );

    //get a random face image
    const face = await getFaces();
    console.log(face);
    //generate personal Data json
    //TODO: Facial Recognition for matching gender and age
    const payload = await getPersonalData("male", 21, 56, face);
    // You can also use this syntax if you prefer
    const { persons } = db.data;
    console.log(payload);
    persons.push(payload);
  }
  // Write db.data content to db.json
  await db.write();

  const endtime = Date.now();
  console.log("Time elapsed: " + (endtime - starttime) / 1000 + "s.");
}

//dumps the db.json
async function resetDB() {
  // Use JSON file for storage
  const file = "./_data/db.json";
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  //reset db entries
  db.data = { persons: [] };
  // Write db.data content to db.json
  await db.write();
}

generateData();

//resetDB();

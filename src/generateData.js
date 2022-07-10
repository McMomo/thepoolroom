import getPersonalData from "./apis/personalData.js";
import { Low, JSONFile } from "lowdb";
import getFaces from "./apis/faces.js";
import facialRecognition from "./services/facialRecognition.js"

let totalEntries = 0;
const TARGET_ENTRIES = 10;
const MIN_CONF = 0.8;

let i = 0;

async function generateData() {
  // await resetDB()
  // Use JSON file for storage
  const file = "./_data/db.json";
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();
  const starttime = Date.now();

  let index = 0;

  // If file.json doesn't exist, db.data will be null
  // Set default data
  db.data = db.data || { persons: [] };

  while (totalEntries < TARGET_ENTRIES) {
    try {
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
      // Facial Recognition for matching gender and age
      const faceMeta = await facialRecognition(face);
      if (faceMeta.ageConf > MIN_CONF && faceMeta.genderConf > MIN_CONF){
        console.log(faceMeta);
        const ageBoundaries = faceMeta.age.split('-');
        const payload = await getPersonalData(faceMeta.gender, parseInt(ageBoundaries[0]), parseInt(ageBoundaries[1]), face);
        // You can also use this syntax if you prefer
        const { persons } = db.data;
        console.log(payload);
        persons.push(payload);
        index++;
        if (index % 10 === 0){
          console.log("Write db.data content to db.json")
          await db.write();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  console.log("Write final db.data content to db.json")
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

import axios from "axios";
import getPersonalData from "./apis/personalData.js";
import fs from "fs";

console.log("Hello World!");

const start = async () => {
  const persons = [];
  for (let i = 0; i < 3; i++) {
    const person = await getPersonalData();
    persons.push(person);
  }

  let data = JSON.stringify(persons);
  fs.writeFileSync("./src/_data/persons.json", data);
};

start();

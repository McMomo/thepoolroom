import axios from "axios";
import getPersonalData from "./apis/personalData.js";

console.log("Hello World!");

console.log(await getPersonalData());

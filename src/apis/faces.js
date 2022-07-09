//Use https://github.com/ozgrozer/100k-faces to get random face
// Gives you a random image
// https://100k-faces.glitch.me/random-image
//
// Gives you a random image URL as JSON
// https://100k-faces.glitch.me/random-image-url

import axios from "axios";

async function getFaces(amount = 1) {
  let response = [];
  for (let i = 0; i < amount; i++) {
    try {
      axios
        .get("https://100k-faces.glitch.me/random-image-url")
        .then((resp) => {
          response.push(resp.data.url);
        });
    } catch (err) {
      console.log("An error has occoured while generating faces", err);
    }
  }
  return response;
}

export default getFaces;

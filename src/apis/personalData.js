import axios from "axios";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

async function getData(gender, minAge = 17, maxAge = 42) {
  const person = {
    main: {},
    contact: {},
    employment: {},
    personalData: {},
    interests: {},
  };
  person["id"] = randomUUID();
  const firstName = faker.name.firstName(gender);
  person.main["firstName"] = firstName;
  const lastName = faker.name.lastName(gender);
  person.main["lastName"] = lastName;
  person.main["prefix"] = faker.name.prefix(gender);
  //TODO change date format
  person.main["birthdate"] = faker.date.birthdate({
    min: minAge,
    max: maxAge,
    mode: "age",
  });

  //TODO change to single entrys for city street etc.
  person.contact["address"] = faker.address.streetAddress(true);
  person.contact["email"] = faker.internet.email(firstName, lastName);
  person.contact["phone"] = faker.phone.number("01## ## ### ##");

  const company = (person.employment["company"] = faker.company.companyName());
  const companyDomain =
    company.replaceAll(/[^\w\s]/gi, "").replaceAll(" ", "-") + ".com";
  person.employment["email"] = faker.internet.email(
    firstName,
    lastName,
    companyDomain
  );
  person.employment["profession"] = faker.name.jobTitle();
  person.employment["area"] = faker.name.jobArea();

  const creditCardIssuer = faker.finance.creditCardIssuer();
  person.personalData["creditCardIssuer"] = creditCardIssuer;
  person.personalData["creditCardNumber"] =
    faker.finance.creditCardNumber(creditCardIssuer);

  const bloodGroup = await getRandomData("/blood/random_blood");
  person.personalData["bloodGroup"] = bloodGroup.group;
  person.personalData["gender"] = gender;
  person.personalData["age"] = minAge; //FIXME

  const favAnimal = faker.animal.type();
  person.interests["favoriteAnimal"] =
    favAnimal + ": " + faker.animal[favAnimal]();
  person.interests["favoriteColor"] = faker.color.rgb();
  person.interests["favoriteEmoji"] = faker.internet.emoji();
  person.interests["favoriteGenre"] = faker.music.genre();
  person.interests["favoriteSong"] = faker.music.songName();
  person.interests["favoriteSong"] = faker.music.songName();
  const food = await getRandomData("/food/random_food");
  person.interests["favoriteDish"] = food.description;
  person.interests["username"] = faker.internet.userName(firstName, lastName);

  // console.log(person);
  return person;
}

const getRandomData = async (url) => {
  const baseUrl = "https://random-data-api.com/api";
  const res = await axios.get(baseUrl + url);
  return res.data;
};

export default getData;

import axios from "axios";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

const getData = async (gender, minAge = 18, maxAge = 42, imgURI) => {
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
  const birthdate =  new Date(faker.date.birthdate({
    min: minAge,
    max: maxAge,
    mode: "age",
  }))
  const dateOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric'
  }
  person.main["birthdate"] = birthdate.toLocaleDateString('en-US', dateOptions);
  const personAge = getAge(birthdate);
  person.main["entryCreated"] = new Date(faker.date.between(new Date(birthdate).setYear(2000), new Date())).toLocaleDateString('en-US', dateOptions)
  person.main["visitors"] = faker.random.numeric(5)
  person.main["lastVisited"] = new Date(faker.date.between(person.main.entryCreated, new Date())).toLocaleDateString('en-US', dateOptions)

  person.contact["address"] = faker.address.streetAddress(true);
  person.contact["city"] = faker.address.cityName();
  person.contact["zip"] = faker.address.zipCode("#####");
  person.contact["street"] = faker.address.street();
  person.contact["houseNumber"] = faker.random.numeric(3)

  person.contact["email"] = faker.internet.email(firstName, lastName);
  person.contact["phone"] = faker.phone.number("01## ## ### ##");

  const bloodGroup = await getRandomData("/blood/random_blood");
  person.personalData["age"] = personAge;
  person.personalData["gender"] = gender;
  person.personalData["bloodGroup"] = bloodGroup.group;

  if (personAge > 17){
    const company = (person.employment["company"] = faker.company.companyName());
    const companyDomain = company.replaceAll(/[^\w\s]/gi, "").replaceAll(" ", "-") + ".com";
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
  }

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
  person["imgURI"] = imgURI;
  return person;
};

const getRandomData = async (url) => {
  const baseUrl = "https://random-data-api.com/api";
  const res = await axios.get(baseUrl + url);
  return res.data;
};

const getAge = (birthday) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default getData;

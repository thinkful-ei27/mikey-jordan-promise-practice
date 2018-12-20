'use strict';

const axios = require('axios');
const searchTerm = process.argv[2];
const URL = 'https://swapi.co/api';

let films, person, characterInfo;



axios.get(`${URL}/people/?search=${searchTerm}`)
  .then((res) => {
    person = res.data.results[0];
    films = person.films;
    
    const promises = films.map(filmUrl => axios.get(filmUrl));
    return Promise.all(promises);
  })
  .then(responses => {
    films = responses.map(response => {
      return { title: response.data.title, releaseDate: parseInt(response.data.release_date.replace(/-/g, ''), 10 )};
    });
    return characterInfoCreator(films, person);
  })
  .then(character => {
    characterLogger(character);
  })
  .catch(err => {
    err.message = `${searchTerm} is not an entity we're looking for. Move along`;
    console.log(err.message);
  });



const characterInfoCreator = function(films, person) {
  characterInfo = {};
  films = films.sort((a,b) => a.releaseDate - b.releaseDate);
  const filmTitles = [];
  for (let i=0; i<films.length; i++) {
    filmTitles.push(`${i + 1}. Star Wars: ${films[i].title}`);
  }
  characterInfo.name = person.name;
  characterInfo.films = filmTitles;
  characterInfo.vehicles = person.vehicles.length;
  characterInfo.starships = person.starships.length;
  if (person.gender === 'male') {
    characterInfo.pronoun = 'He';
  } else if (person.gender === 'female') {
    characterInfo.pronoun = 'She';
  } else {
    characterInfo.pronoun = 'They';
  }
  return characterInfo;
};
  
const characterLogger = function(character) {
  console.log(`
      ${character.name} has been found!

      ${character.pronoun} has starred in the following films:

      ${character.films.join('\n      ')}
  
      ${character.pronoun} has also been associated with a total of ${character.vehicles} vehicles and ${character.starships} starships.
      `);
};


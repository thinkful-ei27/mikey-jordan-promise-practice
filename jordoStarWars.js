'use strict';

const axios = require('axios');
const searchTerm = process.argv[2];
const URL = 'https://swapi.co/api';

axios.get(`${URL}/people/?search=${searchTerm}`)
  .then((response) => {
    const person = response.data.results[0];
    const films = person.films;

    const promises = films.map(filmUrl => axios.get(filmUrl));
    return Promise.all(promises);
  })
  .then(responses => {
    const filmTitles = responses.data.results;
    return { title: response.data.title, releaseDate: response.data.release_date };
  })
  .catch(err => console.log(err.message));


// sort by release date
// films = films.sort((a,b) => a.releaseDate > b.releaseDate);


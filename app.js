'use strict';
const axios = require('axios');
const URL = 'https://swapi.co/api/people';
const searchTerm = process.argv[2];
// const test ="jar jar"

let films, person;

axios.get(`${URL}/?search=${searchTerm}`)
  .then(res => {
    const person  = res.data.results[0];
    const films = person.films;
    
    const promises = films.map(filmUrl => axios.get(filmUrl));
    return Promise.all(promises);
  })
  .then(responses => {
    let films = responses.map(response =>{
      return{ title: response.data.title, releaseDate: response.data.release_date };
    });
    

    films =films.sort((a,b) => a.releaseDate > b.releaseDate);
    console.log(person, films);
    person.starships;

    
  })
  .catch((error) => console.log(error.message ,'error'));





//   .then(films => films.forEach(filmURL => {
//     axios.get(`${filmURL}`)
//       .then(res => {
//         titleArray.push(res.data.title);
//       });
//   }))
//   .catch((error) => console.log(error.message ,'error'));


// Promise.all(filmLinkArray)
//   .then(function(values){ console.log(values);});
  

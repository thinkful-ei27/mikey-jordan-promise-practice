'use strict';
const axios = require('axios');
const URL = 'https://swapi.co/api/people';
const searchTerm = process.argv[2];
// const test ="jar jar"

axios.get(`${URL}/?search=${searchTerm}`)
  .then(res => {
    const filmsArray  = res.data.results[0].films;
    
    const promises = filmsArray.map(filmUrl => axios.get(filmUrl));
    return Promise.all(promises);
  })
  .then(responses => {
    let films = responses.map(response =>{
      return{ title: response.data.title, releaseDAte: response.data.release_date };
    });
    console.log(films);
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
  

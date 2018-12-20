'use strict';
const axios = require('axios');
const URL = 'https://swapi.co/api/people';
const searchTerm = process.argv[2];
// const test ="jar jar"

const filmtitle =[];

// const p = new Promise((resolve, reject) => {
//   return axios.get(`${URL}/?search=${searchTerm}`);
// });

axios.get(`${URL}/?search=${searchTerm}`)
  .then(res => {
    const films = res.data.results[0].films;
    return films;})
  .then(films => {
    const promise1 = function (films) {films.map(film => {
      axios.get(`${film}`)
        .then(res => {
          return res.data.title;
        });
    });
    };
  })
  .then(Promise.all(...promise1)) 
  .catch((error)=> console.log(error.message ,'error'));


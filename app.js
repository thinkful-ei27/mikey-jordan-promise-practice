'use strict';
const axios = require('axios');
const URL = 'https://swapi.co/api/people';
const searchTerm = process.argv[2];
// const test ="jar jar"

axios.get(`${URL}/?search=${searchTerm}`)
  .then(res => console.log(res.data.results[0].films))
  .catch((error)=> console.log(error.message ,'error'));


'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const request = new XMLHttpRequest();
// Bsically open request
request.open('GET', 'https://restcountries.com/v3.1/name/nigeria');
// then we eed to send, willl keep running in asynchronous way
// data = request.send(); // cant do this cause request is not avalible
request.send();

request.addEventListener('load', function () {
  //  console.log(this.responseText) // but we got a big string instead
  // To get an object we use
  const [data] = JSON.parse(this.responseText);
  console.log(data);
});


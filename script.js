'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// TO get multiple countries

/*const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  // Bsically open request
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  // then we eed to send, willl keep running in asynchronous way
  // data = request.send(); // cant do this cause request is not avalible
  request.send();

  request.addEventListener('load', function () {
    //  console.log(this.responseText) // but we got a big string instead
    // To get an object we use
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}
    </div>
  </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    //set country opacity to one
    countriesContainer.style.opacity = 1;
  });
};

// they may not arrive accordingly on the interface cus they load faster then each other, This makes it  visible of a AJAx asynchronous JS
getCountryData('nigeria')
getCountryData('usa')
getCountryData('united kingdom')*/

// Loading datas accordingly with there neighbouring country
const renderCountry = function (data, classname = '') {
  const html = `
  <article class="country ${classname}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //set country opacity to one
  countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  // Bsically open request
  // AJAX call country 1
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country
    renderCountry(data);

    // Get neighbour country
    const [neighbour] = data.borders;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('nigeria');
getCountryAndNeighbour('united kingdom');
*/

// Promises use in preventing call back hell
// Promise is a container of object for an asynchronously delivered value. Example is Response from an AJAX call

// Fetch Api is use in building promise, then we consume the promise

// const request = fetch(`https://restcountries.com/v2/name/nigeria`)
// console.log(request)
//so request is now promise after it datas have been fetch

// Consuming Promises
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); // to read the data from the response and we also return a peomise
    })
    .then(function (data) {
      console.log(data); // then we can call another function to have access to the real data cause we have call json() on previous promise
      renderCountry(data[0]);
    });
};

// We have a then method the handle fulfiled in promises, so we call a call back function if promise now ready inside the then method
getCountryData('nigeria');

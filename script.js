'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// TO get multiple countries

const getCountryData = function (country) {
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
getCountryData('united kingdom')
'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

// Errur render
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

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

    if (!neighbour) return;

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

///////////////////////////////////////////////////////////////
// Promises use in preventing call back hell
// Promise is a container of object for an asynchronously delivered value. Example is Response from an AJAX call

// Fetch Api is use in building promise, then we consume the promise

// const request = fetch(`https://restcountries.com/v2/name/nigeria`)
// console.log(request)
//so request is now promise after it datas have been fetch

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(function (response) {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

/*
// Consuming Promises
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      function (response) {
        // console.log(response);
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`); //Handling Error 404

        return response.json(); // to read the data from the response and we also return a peomise
      }
      // err => alert(err) // prevent reject error
    )
    .then(function (data) {
      console.log(data); // then we can call another function to have access to the real data cause we have call json() on previous promise
      renderCountry(data[0]);

      // Chaining promises
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(data, 'neighbour');
      console.log(data);

      const neighbour2 = data.borders[1];

      // country 3
      return fetch(`https://restcountries.com/v2/alpha/${neighbour2}`);
    })
    .then(reponse => reponse.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong 🤦‍♂️🤦‍♂️ ${err.message}. Try again`); // use to catch the rejected promise ;;
    })
    .finally(() => {
      countriesContainer.style.opacity = 1; // instead of repeating this
    });
};
*/
// We have a then method the handle fulfiled in promises, so we call a call back function if promise now ready inside the then method

/*
// Instead of repeating code for throw new error, i wrote fucnction gerJSON
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(function (data) {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data, 'neighbour');

      const neighbour2 = data.borders[1];
      if (!neighbour2) return;

      // country 3
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour2}, )
      return fetch(`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong 🤦‍♂️🤦‍♂️ ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('germany');
});
*/

/*
// Coding challenge 1
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(function (reponse) {
      console.log(reponse);

      if (!reponse.ok)
        throw new Error(`Problem with geocode (${reponse.status})`);

      return reponse.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city} in ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(reponse => {
      if (!reponse.ok) throw new Error(`Country not found (${reponse.status})`);

      return reponse.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      renderError(`Something went wrong 🤦‍♂️🤦‍♂️ ${err.message}. Try again`); // use to catch the rejected promise ;;
    })
    .finally(() => {
      countriesContainer.style.opacity = 1; // instead of repeating this
    });
};

btn.addEventListener('click', function () {
  // whereAmI(52.508, 13.381);
});

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.874);
*/

/*
// Practice base on last lecture
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');

// the first 2 already on the call stack will work first
// followed by microtasks queue then callback queue */

/*
////////////////////////////////////
//Now time to build our own promise from scratch cus we have been consuming promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Draw now happening 💢');
  // Setting a timer btw lottery card buy and wen it happens
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN 👊👊👊'); // just like fulfill but tis method in promise
    } else {
      reject(new Error('You lose your money 😢😢😢')); // to get real error
    }
  }, 2000);
}); // Encapsulate asynchronous into a promise

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying setTimeOut
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

// consuming and chaining promise
wait(2)
  .then(() => {
    console.log('Waited 2 seconds');
    return wait(1);
  })
  .then(() => console.log('Waited 1 second')); // Can easily use this asynchronous behaviour instesd of having multiple setTimeOut callback */

/*  
// Promisifying Geolocation
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );

    // Can also be done like this also
    // navigator.geolocation.getCurrentPosition(resolve, reject) //Cus is either fulfill or rejected
  });
};

// getPosition().then(pos => console.log(pos));

// Use on former challenge
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(function (reponse) {
      // console.log(reponse);

      if (!reponse.ok)
        throw new Error(`Problem with geocode (${reponse.status})`);

      return reponse.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city} in ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(reponse => {
      if (!reponse.ok) throw new Error(`Country not found (${reponse.status})`);

      return reponse.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      renderError(`Something went wrong 🤦‍♂️🤦‍♂️ ${err.message}. Try again`); // use to catch the rejected promise ;;
    })
    .finally(() => {
      countriesContainer.style.opacity = 1; // instead of repeating this
    });
};

btn.addEventListener('click', whereAmI);
*/

/*
const imgsCont = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imgsCont.append(image);
      resolve(image);
    });

    image.addEventListener('error', function () {
      reject(new Error('Image not load'));
    });
  });
};

let currenImg;
// consume createImage Promise
createImage('img/img-1.jpg')
  .then(img => {
    currenImg = img;
    console.log(`Image one loaded `);
    return wait(3);
  })
  .then(() => {
    currenImg.style.display = 'none';
    return createImage('img/img-2.jpg')
  })
  .then(img => {
    currenImg = img;
    console.log('Image two loaded');
    return wait(3);
  })
  .then(() => {
    currenImg.style.display = 'none';
  })
  .catch(err => console.error(`Image not found `));
*/

// AyncAwait is new mothod of consuming promises which start from ES 2017

// Still using th whereAmI function
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject); //Cus is either fulfill or rejected
  });
};

const whereAmI = async function () {
  // Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  //Reverse geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // country data
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  );
  // console.log(res);
  const data = await res.json(); // cus we still have to call json on the respond
  console.log(data);
  renderCountry(data[0]);
};

whereAmI();

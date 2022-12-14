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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(function (response) {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
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
// Also return a promise

/*
// Still using th whereAmI function
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject); //Cus is either fulfill or rejected
  });
};

const whereAmI = async function () {
  // To be able to catch error using async await we have to put all codes in try object, Which is call try catch

  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting coountry');
    // console.log(res);
    const data = await res.json(); // cus we still have to call json on the respond
    // console.log(data);
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err.message);
    renderError(`😢 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Wil get loction');
// const city = whereAmI(); // This will return a promise cus evry async/await function will always return a promise
// console.log(city);

// so to get the return in whereAmI function
// whereAmI()
//   .then(city => {
//     console.log(city);
//   })
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(console.log('3: finished getting loction')); // Then will work for fulfilled so we can get the return

// If still using then, catch and finally here, thta means we still going back to the old way
// We can use IIFE function to be able to use async await
(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.error(err.message);
  }
  console.log('3: finished getting loction');
})();
*/

/*
// Runing Promises in Parellel
const get3Countries = async function (c1, c2, c3) {
  try {
    // This will run each function one after the other
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // console.log([data1.capital, data2.capital, data3.capital]);

    // But if need to run all at once without waiting for each other, we can go like this
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data.map(eachArray => eachArray[0].capital));
  } catch (err) {
    console.error(err.message);
  }
};

get3Countries('nigeria', 'portugal', 'canada');
*/

/*
// Promise.race: this will return the first data to be settle either fulfilled or rejected
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/mexico`),
    getJSON(`https://restcountries.com/v2/name/spain`),
    getJSON(`https://restcountries.com/v2/name/libya`),
  ]);

  console.log(res[0]);
})();

// Promise.allSettled: With retun all either fulfilled or rejected unlike promise.all that returns error if rejected
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('error'),
  Promise.resolve('new Success'),
]).then(res => console.log(res));

// but this will retuen the printout the error
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('error'),
  Promise.resolve('new Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any: This will print out or return only the first fulfilled data and ignore the rejected once
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('error'),
  Promise.resolve('new Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

*/

// coding challenge 3
// Part 1
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

let currentImg;

const loadPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log(`Image one loaded `);
    await wait(3);
    img.style.display = 'none';

    img = await createImage('img/img-3.jpg');
    console.log(`Image 2 loaded `);
    await wait(3);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadPause();

// Part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(img => createImage(img)); // used async await cus it will return a promise and nothing will happen
    console.log(imgs);

    const imgsEl = await Promise.all(imgs); // to get the images out of the returned promise
    console.log(imgsEl);
    // To display the images
    imgsEl.forEach(img => {
      img.classList.add('parallel');
    });
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

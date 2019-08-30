/**
 * Techdegree Unit-05 
 * Public API Request 
 */

//-----------------------------------------------------
// CONSTANTS
//-----------------------------------------------------
// elements
const apiUrl = 'https://randomuser.me/api/?results=12&nat=us';
const searchDIV = document.querySelector('div.search-container');
const getGalleyDIV = document.getElementById('gallery');
// form
const form = document.createElement('form');
const search = document.createElement('input');
const submit = document.createElement('input');
// gallery
// const galleryCard = document.createElement('div');
// const cardImageContainer = document.createElement('div');
// const cardInformationContainer = document.createElement('div');
// const galleryImage = document.createElement('img');
// const galleryHeading = document.createElement('h3');
// const galleyEmail = document.createElement('p');
// const galleyLocation = document.createElement('p');



//-----------------------------------------------------
// FETCHING
//-----------------------------------------------------
async function fetchData(url) {
  return fetch(url)
      .then(checkStatus)
      .then(res => res.json())
      .catch(error => console.log('Looks like there was a problem', error));
}

fetchData(apiUrl)
  .then(data => {
    mapData(data.results);
  });


//-----------------------------------------------------
// HELPER FUNCTIONS
//-----------------------------------------------------
/**
 * Check the status of response from API
 * @param {response} response - check if response is 200 else throw error
 */
function checkStatus(response) {
  if(response.ok) {
      return Promise.resolve(response);
  } else {
      return Promise.reject(new Error(response.statusText));
  }
}

/**
 * Adds multiple attributes to one element
 * @param {HTML} element - Element to add attribute 
 * @param {attribute} attribute - Attributes to add to the element
 */
function setAttributes (element, attribute) {
  for (let key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

function mapData (data) {
  data.forEach(item => {
    
    makeGalley(item);

  });
}

function makeGalley (data) {
  const galleryCard = document.createElement('div');
  const cardImageContainer = document.createElement('div');
  const cardInformationContainer = document.createElement('div');
  const galleryImage = document.createElement('img');
  const galleryHeading = document.createElement('h3');
  const galleyEmail = document.createElement('p');
  const galleyLocation = document.createElement('p');

  // make card | set attribute
  getGalleyDIV.append(galleryCard);
    galleryCard.setAttribute('class', 'card');
  // make image container | set attribute
  galleryCard.append(cardImageContainer);
    cardImageContainer.setAttribute('class', 'card-img-container');
  // create and append img for galley
  cardImageContainer.append(galleryImage);
    setAttributes(galleryImage, {'class': 'card-img', 'src': `${data.picture.thumbnail}`, 'alt': 'profile picture'});
  // create div and set class for info
  galleryCard.append(cardInformationContainer);
    cardInformationContainer.setAttribute('class', 'card-info-container');
  // create H3 element set attributes
  cardInformationContainer.append(galleryHeading);
    setAttributes(galleryHeading, {'id': 'name', 'class': 'card-name', 'class': 'cap'});
    galleryHeading.textContent = `${data.name.first} ${data.name.last}`;
  // create email paragraph element
  cardInformationContainer.append(galleyEmail);
    galleyEmail.setAttribute('class', 'card-text');
    galleyEmail.textContent = `${data.email}`;
  // create location paragraph element
  cardInformationContainer.append(galleyLocation);
    setAttributes(galleyLocation, {'class': 'card-text', 'class': 'cap'});
    galleyLocation.textContent = `${data.location.city}, ${data.location.state}`;
}


//-----------------------------------------------------
// BUILD TO PAGE
//-----------------------------------------------------

// Add Form to page
searchDIV.append(form);
// Set attributes to form
setAttributes(form, {'action': '#', 'method': 'get'});
// Add input elements to the form field
form.append(search);
  setAttributes(search, {'type': 'search', 'id': 'search-input', 'class': 'search-input', 'placeholder': 'Search...'});
form.append(submit);
  setAttributes(submit, {'type': 'submit', 'value': 'Submit', 'id': 'search-submit', 'class': 'search-submit'});




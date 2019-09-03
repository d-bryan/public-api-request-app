/**
 * Techdegree Unit-05 
 * Public API Request
 * Author: Dylan Bryan
 */
$(document).ready(() => {

  //-----------------------------------------------------
  // CONSTANTS
  //-----------------------------------------------------
  // elements
  const numUsers = 12; // users to request 
  const apiUrl = `https://randomuser.me/api/?results=${numUsers.toString()}&nat=us`; // API string
  const searchDIV = document.querySelector('div.search-container');
  const getGalleyDIV = document.getElementById('gallery');
  let page = '';

  // form
  const form = document.createElement('form');
  const search = document.createElement('input');
  const submit = document.createElement('input');

  // array for user data
  var usersArray = [];

  //-----------------------------------------------------
  // ADD ELEMENTS TO PAGE
  //-----------------------------------------------------

  // Add Form to page
  searchDIV.append(form);
  // Set attributes to form
  setAttributes(form, {'action': '#', 'method': 'get'});
  // Add input elements to the form field
  form.append(search);
    setAttributes(search, {'type': 'search', 'id': 'search-input', 'class': 'search-input', 'placeholder': 'Search...'});
  // add submit button to page
  form.append(submit);
    setAttributes(submit, {'type': 'submit', 'value': 'Submit', 'id': 'search-submit', 'class': 'search-submit'});

  //-----------------------------------------------------
  // FETCHING
  //-----------------------------------------------------
  /**
   * Asyncronous function to fetch data from
   * @param {API} url - URL to fetch data from 
   */
  async function fetchData(url) {
    return fetch(url)
        // check to ensure status is 200
        .then(checkStatus)
        // convert response to JSON
        .then(res => res.json())
        // loop through data and map to template
        .then(data => {
          // map results to be used for bulding html
          mapData(data.results);
        })
        // handle any errors and log to console
        .catch(error => console.log('Looks like there was a problem', error));
  }

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
   * Helper function to pass the parsed JSON data to other builder functions
   * @param {JSON} data - Parsed JSON data to pass to other functions
   */
  function mapData (data) {
    // console.log(data);
    data.forEach(item => {
      // push each object to users array
      usersArray.push(item);
    });
    // make gallery of employees with objects
    makeGalleryTemplate(data);
  }
  // fetch the data and map the results to templates
  fetchData(apiUrl)

  //-----------------------------------------------------
  // HELPER FUNCTIONS
  //-----------------------------------------------------

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

  //-----------------------------------------------------
  // HTML TEMPLATES
  //-----------------------------------------------------

  /**
   * Build the Gallery based on how many users are requested in API request 1 or 500
   * @param {JSON} item - parsed JSON data to build HTML with
   */
  function makeGalleryTemplate (item) {
    
    for (let index = 0; index < usersArray.length; index ++){

      // create div element
      let cardDIV = document.createElement('div');
      setAttributes(cardDIV, {'class': 'card'});
      
      // template
      page = `
        <div class="card-img-container" index="${index}">
            <img class="card-img" src="${item[index].picture.large}" alt="profile picture" index="${index}">
        </div>
        <div class="card-info-container" index="${index}">
            <h3 id="name" class="card-name cap" index="${index}">${item[index].name.first} ${item[index].name.last}</h3>
            <p class="card-text" index="${index}">${item[index].email}</p>
            <p class="card-text cap" index="${index}">${item[index].location.city}, ${item[index].location.state}</p>
        </div>
      `;
      // add to page
      cardDIV.innerHTML = page;
      $('#gallery').append(cardDIV);

      // add event listener to each card to make modal template
      cardDIV.addEventListener('click', () => {
        // makeModalTemplate(item, index);
        makeModalTemplate(usersArray, index);
      });

    }
  }

  /**
   * Build the Modal based on requested data
   * @param {JSON} item - Parsed JSON data to build HTML with 
   */
  function makeModalTemplate (item, index) {
    // template
    const modalCard = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn">X</button>
        <div class="modal-info-container">
            <img class="modal-img" src="${item[index].picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${item[index].name.first} ${item[index].name.last}</h3>
            <p class="modal-text">${item[index].email}</p>
            <p class="modal-text cap">${item[index].location.city}</p>
            <br>
            <p class="modal-text cap"><strong>${'Employee Information'.toUpperCase()}</strong></p>
            <p class="modal-text">${item[index].cell}</p>
            <p class="modal-text cap">${item[index].location.street}, ${item[index].location.city}, ${item[index].location.state} ${item[index].location.postcode}</p>
            <p class="modal-text">Birthday: ${item[index].dob.date.slice(5,7)}-${item[index].dob.date.slice(8,10)}-${item[index].dob.date.slice(0,4)}</p>
        </div>
      </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>
    `;
    
    // append modal to page
    getGalleyDIV.insertAdjacentHTML('afterend', modalCard);
    // call the filter emplyoyees function for click abilities on modal
    filterEmployees(usersArray, index);

  }

  /**
   * This callback allows the modal to cycle past the array length back
   * to the beginning, or from the begging back to the end
   * @param {Array} item - usersArray item to pass through template
   * @param {Number} index - index number to use for data
   */
  function callbackBuild (item, index) {
    const modalCardInfo = `
    <div class="modal-info-container">
      <img class="modal-img" src="${item[index].picture.large}" alt="profile picture">
      <h3 id="name" class="modal-name cap">${item[index].name.first} ${item[index].name.last}</h3>
      <p class="modal-text">${item[index].email}</p>
      <p class="modal-text cap">${item[index].location.city}</p>
      <br>
      <p class="modal-text cap"><strong>${'Employee Information'.toUpperCase()}</strong></p>
      <p class="modal-text">${item[index].cell}</p>
      <p class="modal-text cap">${item[index].location.street}, ${item[index].location.city}, ${item[index].location.state} ${item[index].location.postcode}</p>
      <p class="modal-text">Birthday: ${item[index].dob.date.slice(5,7)}-${item[index].dob.date.slice(8,10)}-${item[index].dob.date.slice(0,4)}</p>
    </div>
    `;
    return modalCardInfo;
  }

  function filterEmployees (item ,index) {
    
    let $previousButton = $('#modal-prev');
    let $nextButton = $('#modal-next');
    
      // select previous employee
      $previousButton.on('click', () => {
        index -= 1;

        if (index >= 0 && index <= (usersArray.length - 1)) {
          // empty the div
          $('div.modal-info-container').empty();
          // append the new html
          $('div.modal').append(callbackBuild(item,index));
        } else if (index < 0) {
          // index equals 0 for start
          index = 0;
          // empty the div
          $('div.modal-info-container').empty();
          // append the new html
          $('div.modal').append(callbackBuild(item,index));
        }
      });
    
    // select next employee
    $nextButton.on('click', () => {
      index += 1;

      if (index <= (usersArray.length - 1) && index >= 0) {
        // empty the div
        $('div.modal-info-container').empty();
        // append the new html
        $('div.modal').append(callbackBuild(item,index));
      } else if (index > (usersArray.length - 1)) {
        // index equals users array length - 1
        index = (usersArray.length - 1);
        // empty the div
        $('div.modal-info-container').empty();
        // append the new html
        $('div.modal').append(callbackBuild(item,index));
      }
    });
  }

  //-----------------------------------------------------
  // EVENT LISTENERS
  //-----------------------------------------------------
  // close modal window 
  document.addEventListener('click', closeModalWindow);
  // search keyup event listener
  $('#search-input').on('keyup', function() {
    // loop over the cards for search
    for (let i = 0; i < $('.card').length; i += 1) {
        // if match is found change the color to crimson
        if (($('.card')[i].children[1].children[0].innerHTML).includes($('#search-input').val().toLowerCase())) {
          $('.card')[i].style.backgroundColor = 'crimson';
        // else change the color back to normal  
        } else {
          $('.card')[i].style.backgroundColor = 'rgba(245, 245, 245, 0.9)';
        }
        // if the text input field is empty then make background color normal
        if ($('#search-input').val() === '') {
          $('.card').css('background-color', 'rgba(245, 245, 245, 0.9)');
        }

    }
  });
  //-----------------------------------------------------
  // EVENT FUNCTIONS
  //-----------------------------------------------------
  /**
   * This helps to close the modal winow and turn the display properties off
   * @param {event} e - click event to close 
   */
  function closeModalWindow (e) {
    // if target content = X and type = button
    if (
      e.target.textContent === 'X' &&
      e.target.type === 'button' 
      ) {
        // close the window
      $('div.modal-container').css('display', 'none');
    }
  }
});
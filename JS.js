// The form element
const form = document.querySelector('form');

// The main element
const main = document.querySelector('main');

// Add a submit event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = form.haircutSearch.value;

const form = document.getElementById("login-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
});

    

// The button element
    function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}



// Create a new map
const map = new google.maps.Map(mapContainer, mapOptions);
const mapContainer = document.getElementById('map');
const map = new google.maps.Map(mapContainer, mapOptions);
  const filteredResults = allResults.filter((result) => {
    return result.haircut.includes(searchTerm);
  });


// Initial map options
const mapOptions = {
  center: { }, // you can put any location inside { } 
  zoom: 10,
};

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

// The class Name element

function resetClass(element, classname){
  element.classList.remove(classname);
}
document.getElementsByClassName("show-signup")[0].addEventListener("click",function(){
  let form = document.getElementsByClassName("form")[0];
  resetClass(form, "signin");
  resetClass(form, "reset");
  form.classList.add("signup");
  document.getElementById("submit-btn").innerText = "Sign Up";
});
document.getElementsByClassName("show-signin")[0].addEventListener("click",function(){
  let form = document.getElementsByClassName("form")[0];
  resetClass(form, "signup");
  resetClass(form, "reset");
  form.classList.add("signin");
  document.getElementById("submit-btn").innerText = "Sign In";
});
document.getElementsByClassName("show-reset")[0].addEventListener("click",function(){
  let form = document.getElementsByClassName("form")[0];
  resetClass(form, "signup");
  resetClass(form, "signin");
  form.classList.add("reset");
  document.getElementById("submit-btn").innerText = "Reset password";
});

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



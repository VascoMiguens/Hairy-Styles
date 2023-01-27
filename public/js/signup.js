const signupFormHandler = async (event) => {
    event.preventDefault();
  // reading the values inputted into the form for name, email and password
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  // if there is all three; name, email and password then the POST request will be sent to the API endpoint
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
// if the response from the backend routing is ok, then the page is replaced with the /login page
if (response.ok) {
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
    }
  };

  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  
async function signupFormHandler(event) {
    event.preventDefault();
    // get the information from the sign up form
    const first_name = document.querySelector('#first_name').value.trim();
    const user_name = document.querySelector('#user_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    // if all three fields have content
    if (user_name && first_name && email && password) {
        // POST the new user to the user table in the database
        console.log(user_name)
        const response = await fetch('/api/users/signup', {
            method: 'post',
            body: JSON.stringify({
                user_name,
                first_name,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
         });
         // when the fetch promise is fufilled, check the response status and convey the results
         if (response.ok) {
             alert('Account created! Please log in.');
             document.location.replace('/');
         } else {
             alert(response.statusText)
        }
    }
}
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
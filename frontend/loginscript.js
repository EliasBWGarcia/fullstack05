
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                response.text().then(text => alert(text));
            }
        })
        .catch(error => console.error('Error during login:', error));
});


document.getElementById('create-account-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please enter both username and password and press create an account.');
        return;
    }

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                alert('Account created successfully. Please login.');

                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            } else {
                response.text().then(text => alert(text));
            }
        })
        .catch(error => console.error('Error during account creation:', error));
});


document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Indtast både brugernavn og password. Læs placeholderne i input felterne, eller opret en konto. Skriv dine nye login-oplysninger, og tryk herefter på opret konto.');
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
        .catch(error => console.error('Fejl ved login', error));
});


document.getElementById('create-account-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Læs placeholderne i input felterne, eller opret en konto. Skriv dine nye login-oplysninger, og tryk herefter på opret konto.');
        return;
    }

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                alert('Konto oprettet. Indtast oplysningerne i input felterne.');

                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            } else {
                response.text().then(text => alert(text));
            }
        })
        .catch(error => console.error('Fejl ved kontooprettelse. ', error));
});

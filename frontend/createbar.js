// Hent og vis alle barer, når siden indlæses
document.addEventListener('DOMContentLoaded', () => {
    fetchBars();
});

// Funktion til at hente alle barer fra serveren
function fetchBars() {
    fetch('http://localhost:3000/bars')
        .then(response => response.json())
        .then(data => displayBars(data))
        .catch(error => console.error('Fejl ved hentning af barer:', error));
}

// Funktion til at vise barer i listen
function displayBars(bars) {
    const barList = document.getElementById('bar-list');
    barList.innerHTML = '';

    bars.forEach(bar => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${bar.name}</strong> - ${bar.city}
            <button class="update-btn" data-id="${bar.bar_id}">Opdater</button>
            <button class="delete-btn" data-id="${bar.bar_id}">Slet</button>
            <div id="update-form-${bar.bar_id}" class="update-form" style="display: none;">
                <!-- Opdateringsformular felter -->
                <input type="text" id="update-bar-name-${bar.bar_id}" value="${bar.name}" placeholder="Bar Navn" required>
                <input type="number" id="update-bar-rating-${bar.bar_id}" value="${bar.rating}" placeholder="Bedømmelse (1-5)" min="1" max="5">
                <input type="number" id="update-bar-size-${bar.bar_id}" value="${bar.kvadratmeter}" placeholder="Størrelse i m²">
                <!-- Adresse Felter -->
                <input type="text" id="update-street-name-${bar.bar_id}" value="${bar.street_name}" placeholder="Gadenavn" required>
                <input type="number" id="update-street-number-${bar.bar_id}" value="${bar.street_number}" placeholder="Gadenummer" required>
                <input type="number" id="update-zip-code-${bar.bar_id}" value="${bar.zip_code}" placeholder="Postnummer" required>
                <input type="text" id="update-city-${bar.bar_id}" value="${bar.city}" placeholder="By" required>
                <!-- Lokationsfelter -->
                <input type="text" id="update-lat-${bar.bar_id}" value="${bar.lat}" placeholder="Breddegrad" required>
                <input type="text" id="update-lng-${bar.bar_id}" value="${bar.lng}" placeholder="Længdegrad" required>
                <button class="save-btn" data-id="${bar.bar_id}">Gem</button>
                <button class="cancel-btn" data-id="${bar.bar_id}">Annullér</button>
            </div>
        `;
        barList.appendChild(li);
    });

    // Tilføj event listeners til opdater og slet knapper
    const updateButtons = document.querySelectorAll('.update-btn');
    updateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const barId = button.getAttribute('data-id');
            showUpdateForm(barId);
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const barId = button.getAttribute('data-id');
            deleteBar(barId);
        });
    });

    // Tilføj event listeners til gem og annuller knapper i opdateringsformularen
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const barId = button.getAttribute('data-id');
            updateBar(barId);
        });
    });

    const cancelButtons = document.querySelectorAll('.cancel-btn');
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const barId = button.getAttribute('data-id');
            hideUpdateForm(barId);
        });
    });
}

// Event listener for at tilføje en ny bar
document.getElementById('add-bar-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const barData = {
        name: document.getElementById('bar-name').value.trim(),
        rating: document.getElementById('bar-rating').value.trim(),
        kvadratmeter: document.getElementById('bar-size').value.trim(),
        street_name: document.getElementById('street-name').value.trim(),
        street_number: document.getElementById('street-number').value.trim(),
        zip_code: document.getElementById('zip-code').value.trim(),
        city: document.getElementById('city').value.trim(),
        lat: document.getElementById('lat').value.trim(),
        lng: document.getElementById('lng').value.trim()
    };

    fetch('http://localhost:3000/bars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(barData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // Håndter fejlrespons
                return response.text().then(text => {
                    throw new Error(text || 'Fejl ved tilføjelse af bar');
                });
            }
        })
        .then(data => {
            alert('Bar tilføjet succesfuldt');
            // Nulstil formularen
            document.getElementById('add-bar-form').reset();
            fetchBars(); // Opdater listen
        })
        .catch(error => console.error('Fejl ved tilføjelse af bar:', error));
});

// Funktion til at slette en bar
function deleteBar(barId) {
    if (confirm('Er du sikker på, at du vil slette denne bar?')) {
        fetch(`http://localhost:3000/bars/${barId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert('Bar slettet succesfuldt');
                    fetchBars();
                } else {
                    alert('Fejl ved sletning af bar');
                }
            })
            .catch(error => console.error('Fejl ved sletning af bar:', error));
    }
}

// Funktion til at vise opdateringsformularen for en bar
function showUpdateForm(barId) {
    document.getElementById(`update-form-${barId}`).style.display = 'block';
}

// Funktion til at skjule opdateringsformularen
function hideUpdateForm(barId) {
    document.getElementById(`update-form-${barId}`).style.display = 'none';
}

// Funktion til at opdatere en bar
function updateBar(barId) {
    const barData = {
        name: document.getElementById(`update-bar-name-${barId}`).value.trim(),
        rating: document.getElementById(`update-bar-rating-${barId}`).value.trim(),
        kvadratmeter: document.getElementById(`update-bar-size-${barId}`).value.trim(),
        street_name: document.getElementById(`update-street-name-${barId}`).value.trim(),
        street_number: document.getElementById(`update-street-number-${barId}`).value.trim(),
        zip_code: document.getElementById(`update-zip-code-${barId}`).value.trim(),
        city: document.getElementById(`update-city-${barId}`).value.trim(),
        lat: document.getElementById(`update-lat-${barId}`).value.trim(),
        lng: document.getElementById(`update-lng-${barId}`).value.trim()
    };

    fetch(`http://localhost:3000/bars/${barId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(barData)
    })
        .then(response => {
            if (response.ok) {
                alert('Bar opdateret succesfuldt');
                hideUpdateForm(barId);
                fetchBars();
            } else {
                alert('Fejl ved opdatering af bar');
            }
        })
        .catch(error => console.error('Fejl ved opdatering af bar:', error));
}

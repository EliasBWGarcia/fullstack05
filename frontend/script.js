function fetchAllBars() {
    fetch('http://localhost:3000/bars')
        .then(response => response.json())
        .then(data => {
            displayBars(data);
        })
        .catch(error => console.error('Error fetching bars:', error));
}

function searchBarByName(name) {
    fetch(`http://localhost:3000/bars/name/${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            displayBars(data);
        })
        .catch(error => console.error('Error searching for bar:', error));
}


function searchBarsByCity(city) {
    fetch(`http://localhost:3000/bars/city/${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            displayBars(data);
        })
        .catch(error => console.error('Error searching for bars by city:', error));
}

function searchBarsByID(id) {
    fetch(`http://localhost:3000/bars/id/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => {
            displayBars(data);
        })
        .catch(error => console.error('Error searching for bars by city:', error));
}


function displayBars(bars) {
    const barList = document.getElementById('bar-list');
    barList.innerHTML = '';

    if (bars.length === 0) {
        barList.innerHTML = '<li>No bars found.</li>';
        return;
    }

    bars.forEach(bar => {
        const li = document.createElement('li');
        li.innerHTML = `
      <h3>${bar.name}</h3>
      <p><strong>Rating:</strong> ${bar.rating}</p>
      <p><strong>Size:</strong> ${bar.kvadratmeter} m²</p>
      <p><strong>Address:</strong> ${bar.street_name} ${bar.street_number}, ${bar.zip_code} ${bar.city}</p>
      <p><strong>Coordinates:</strong> (${bar.lat}, ${bar.lng})</p>
    `;
        barList.appendChild(li);
    });
}


document.getElementById('search-btn').addEventListener('click', () => {
    const name = document.getElementById('search-input').value.trim();
    if (name) {
        searchBarByName(name);
    } else {
        fetchAllBars();
    }
});


document.getElementById('city-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        searchBarsByCity(city);
    } else {
        fetchAllBars();
    }
});


document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('city-input').value = '';
    fetchAllBars();
});


fetchAllBars();
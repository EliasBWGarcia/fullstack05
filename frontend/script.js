// File: frontend/script.js

// Function to fetch and display all bars
function fetchAllBars() {
    fetch('http://localhost:3000/bars')
        .then(response => response.json())
        .then(data => {
            displayBars(data);
        })
        .catch(error => console.error('Error fetching bars:', error));
}

// Function to search for a bar by name
function searchBarByName(name) {
    fetch(`http://localhost:3000/bars/${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            displayBars(data);
        })
        .catch(error => console.error('Error searching for bar:', error));
}

// Function to search for bars by city
function searchBarsByCity(city) {
    fetch(`http://localhost:3000/bars/city/${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            displayBars(data);
        })
        .catch(error => console.error('Error searching for bars by city:', error));
}

// Function to display bars in the list
function displayBars(bars) {
    const barList = document.getElementById('bar-list');
    barList.innerHTML = ''; // Clear previous results

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

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', () => {
    const name = document.getElementById('search-input').value.trim();
    if (name) {
        searchBarByName(name);
    } else {
        fetchAllBars();
    }
});

// Event listener for the city filter button
document.getElementById('city-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        searchBarsByCity(city);
    } else {
        fetchAllBars();
    }
});

// Event listener for the reset button
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('city-input').value = '';
    fetchAllBars();
});

// Fetch and display all bars on page load
fetchAllBars();

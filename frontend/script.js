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

function searchBarsByID(id) {
    fetch(`http://localhost:3000/bars/id/${encodeURIComponent(id)}`)
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


// event listener for login-btn
document.getElementById('login-btn').addEventListener('click', () => {
   console.log("login button clicked")
})


// Fetch and display all bars on page load
fetchAllBars();





//Kort situationen
////fra https://leafletjs.com/examples/quick-start/
//jeg prøver at hive div'en barlist ud fra html // eller fra localhost/300/bars, da det er der dataen kommer til at ligge på siden
//const barsArray = document.get   måske?


//har sat kortet herunder til at starte på kordinater og med et zoom der viser Danmark
const map = L.map('map').setView([55.6761, 12.5683], 13);


// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



/*
//hjælp fra chatGPT
// Funktion til at tilføje barer som markører på kortet
function addBarsToMap(bars) {
    bars.forEach(bar => {
        if (bar_location.lat && bar_location.lng) { // Sørg for at baren har koordinater
            L.marker([bar_location.lat, bar_location.lng]) //opretter markører og sætter dem på kortet
                .addTo(map)
                .bindPopup(`<b>${bar.name}</b><br>${bar_address.street_name} ${bar_address.street_number}, ${bar_address.city}`);
        }
    });
}
*/


// Fetch bars data from the server
//lige nu virker det ikke at indsætte markørerne, fordi det vi får tilbage fra endpointet er lidt spøjst fordi nogen har skrevet sql-queryesne på en max fucked måde
fetch('http://localhost:3000/bars')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(bars=> {
            L.marker([bar_location.lat, bar_location.lng]).addTo(map)
        })
    })
    .catch(error => console.log('Error fetching bars', error));


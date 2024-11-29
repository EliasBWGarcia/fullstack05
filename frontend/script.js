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


// create new user
//gutter jeg kan ikke finde ud af det lige nu
//se https://github.com/nicklasdean/post-error-handling for hjælp
document.getElementById('login-btn').addEventListener('click', () => {
   console.log("login button clicked")

    //henter values fra inputfelterne i login-div'en
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    fetch('bars/:new-user')
        //noget


})


// Fetch and display all bars on page load
fetchAllBars();





//Kort på siden
////har brugt https://leafletjs.com/examples/quick-start/

//har sat kortet herunder til at starte på kordinater med et zoom der københavn
const map = L.map('map').setView([55.6761, 12.5683], 13);


// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



//Tilføjer markers på alle barer

// Fetch bars data from the server
//henter lat og lng til markers fra localhost/300/bars - det kommer tilbage som et object
fetch('http://localhost:3000/bars')
    .then(response => response.json())
    .then(data => {
        console.log("data fetched")
        console.log(data)

        data.forEach(bar => {
            // Adding a marker for each bar

                //jeg kan se når jeg logger dataen vi får tilbage, at lat og lng åbenbart er strings - derfor må vi konventere dem til tal, før de kan bruges som kordinater
            const lat = parseFloat(bar.lat);
            const lng = parseFloat(bar.lng);

            //laver markeren til et billede af en øl
            //hjælp fra https://stackoverflow.com/questions/21584790/how-to-use-custom-markers-with-leaflet
            const beerIcon = L.icon({
                iconUrl: `beer.png`,
                iconSize:     [80, 70], // size of the icon
                popupAnchor:  [0, -20] // popup relative to the iconAnchor
            });


            //Hjælp fra chatGPT til at få ideen at tjekke, om lat og lng ikke-ikke er et tal
            if (!isNaN(lat) && !isNaN(lng)) { // Tjekker om de blev til tal, og laver en marker hvis de er blevet til tal
                marker = L.marker([lat, lng], {icon: beerIcon}).addTo(map);

                //tilføjer skilte med bar-navn på markers hvis man trykker på dem
                marker.bindPopup(`${bar.name}`)

            } else {
                console.error(`Invalid coordinates for bar: ${bar.name}`);
            }
                });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

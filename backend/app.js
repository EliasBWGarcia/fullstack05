const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Create MySQL connection using environment variables
const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

// Endpoint for at fremsøge alle barer i databasen - kommer automatisk når du åbner siden
app.get('/bars', (req, res) => {
    const query = `
    SELECT b.bar_id, b.name, b.rating, b.kvadratmeter,
           ba.street_name, ba.street_number, ba.zip_code, ba.city,
           bl.lat, bl.lng
    FROM Bar b
    JOIN bar_address ba ON b.bar_address_id = ba.address_id
    JOIN bar_location bl ON b.bar_location_id = bl.location_id
  `;
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Endpoint for at få kun 1 bar med et specifikt navn
app.get('/bars/:name', (req, res) => {
    const barName = req.params.name;
    const query = `
    SELECT b.bar_id, b.name, b.rating, b.kvadratmeter,
           ba.street_name, ba.street_number, ba.zip_code, ba.city,
           bl.lat, bl.lng
    FROM Bar b
    JOIN bar_address ba ON b.bar_address_id = ba.address_id
    JOIN bar_location bl ON b.bar_location_id = bl.location_id
    WHERE b.name = ?
  `;
    connection.query(query, [barName], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Endpoint til at filtrere i byer
app.get('/bars/city/:city', (req, res) => {
    const city = req.params.city;
    const query = `
    SELECT b.bar_id, b.name, b.rating, b.kvadratmeter,
           ba.street_name, ba.street_number, ba.zip_code, ba.city,
           bl.lat, bl.lng
    FROM Bar b
    JOIN bar_address ba ON b.bar_address_id = ba.address_id
    JOIN bar_location bl ON b.bar_location_id = bl.location_id
    WHERE ba.city = ?
  `;
    connection.query(query, [city], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


// Endpoint for at få en bar udfra dens id
app.get('/bars/:ID', (req, res) => {
    const barID = req.params.ID;
    const query = `
    SELECT b.bar_id, b.name, b.rating, b.kvadratmeter,
           ba.street_name, ba.street_number, ba.zip_code, ba.city,
           bl.lat, bl.lng
    FROM bar
    JOIN bar_address ba ON b.bar_address_id = ba.address_id
    JOIN bar_location bl ON b.bar_location_id = bl.location_id
    WHERE b.bar_id = ?
  `;
    connection.query(query, [barID], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

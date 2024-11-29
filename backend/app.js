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

// Endpoint for at fremsøge alle barer i databasen
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
app.get('/bars/name/:name', (req, res) => {
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
app.get('/bars/id/:ID', (req, res) => {
    const barID = req.params.ID;
    const query = `
    SELECT b.bar_id, b.name, b.rating, b.kvadratmeter,
           ba.street_name, ba.street_number, ba.zip_code, ba.city,
           bl.lat, bl.lng
    FROM bar b
    JOIN bar_address ba ON b.bar_address_id = ba.address_id
    JOIN bar_location bl ON b.bar_location_id = bl.location_id
    WHERE b.bar_id = ?
  `;
    connection.query(query, [barID], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


//endpoint for creating new user
//gutter jeg kan ikke finde ud af det lige nu - se https://github.com/nicklasdean/post-error-handling for hjælp
app.post('bars/:new-user'), (req, res) => {
    const newUser = req.params["new-user"];
    //query til at sætte dataen ind i databasen - man behøves ikke skrive user_id da den er auto incrementing og selv giver rækken id
    const query = `INSERT INTO USER (password, user_id, username)
                          VALUES (password, ,username)`
}




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

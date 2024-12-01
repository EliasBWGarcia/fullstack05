const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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
    // Perform the query
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Server error');
        }
        // Send results as a response
        res.json(results); // Ensure this is inside the query callback
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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const values = [username, password];
    const sqlQuery = 'SELECT * FROM user WHERE username = ? AND password = ?';

    connection.query(sqlQuery, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        // Login successful
        res.status(200).json({ success: true });
    });
});

app.post('/register', (req, res) => {
    const {username, password} = req.body;

    const checkQuery = 'SELECT * FROM user WHERE username = ?';
    connection.query(checkQuery, [username], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            return res.status(409).send('Username already exists');
        }

        // Insert new user into the database with hashed password
        const insertQuery = 'INSERT INTO user (username, password) VALUES (?, ?)';
        connection.query(insertQuery, [username, password], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Server error');
            }

            res.status(201).json({success: true});
        });
    });
})
// Endpoint for at oprette en ny bar
app.post('/bars', (req, res) => {
    const {
        name, rating, kvadratmeter,
        street_name, street_number, zip_code, city,
        lat, lng
    } = req.body;

    // Indsæt i bar_address
    const addressQuery = 'INSERT INTO bar_address (street_name, street_number, zip_code, city) VALUES (?, ?, ?, ?)';
    const addressValues = [street_name, street_number, zip_code, city];

    connection.query(addressQuery, addressValues, (error, addressResult) => {
        if (error) {
            console.error('Database fejl:', error);
            return res.status(500).send('Server fejl');
        }

        const addressId = addressResult.insertId;

        // Indsæt i bar_location
        const locationQuery = 'INSERT INTO bar_location (lat, lng) VALUES (?, ?)';
        const locationValues = [lat, lng];

        connection.query(locationQuery, locationValues, (error, locationResult) => {
            if (error) {
                console.error('Database fejl:', error);
                return res.status(500).send('Server fejl');
            }

            const locationId = locationResult.insertId;

            // Indsæt i Bar
            const barQuery = `
                INSERT INTO Bar (name, rating, kvadratmeter, bar_address_id, bar_location_id)
                VALUES (?, ?, ?, ?, ?)
            `;
            const barValues = [name, rating, kvadratmeter, addressId, locationId];

            connection.query(barQuery, barValues, (error, barResult) => {
                if (error) {
                    console.error('Database fejl:', error);
                    return res.status(500).send('Server fejl');
                }

                res.status(201).json({ bar_id: barResult.insertId });
            });
        });
    });
});

// Endpoint for at slette en bar
app.delete('/bars/:id', (req, res) => {
    const barId = req.params.id;

    // Slet fra Bar tabellen
    const deleteBarQuery = 'DELETE FROM Bar WHERE bar_id = ?';
    connection.query(deleteBarQuery, [barId], (error, result) => {
        if (error) {
            console.error('Database fejl:', error);
            return res.status(500).send('Server fejl');
        }

        res.status(200).send('Bar slettet succesfuldt');
    });
});

app.listen(port, () => {
    console.log(`Serveren kører på port ${port}`);
});

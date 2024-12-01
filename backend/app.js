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

// Endpoint for retrieving bars with optional filters
app.get('/bars', (req, res) => {
    const { name, city, minRating, maxRating, minSize, maxSize } = req.query;

    // Build the base query
    let query = `
        SELECT b.bar_id, b.name, b.rating, b.kvadratmeter,
               ba.street_name, ba.street_number, ba.zip_code, ba.city,
               bl.lat, bl.lng
        FROM Bar b
        JOIN bar_address ba ON b.bar_address_id = ba.address_id
        JOIN bar_location bl ON b.bar_location_id = bl.location_id
        WHERE 1=1
    `;
    const params = [];

    // Add filters based on provided query parameters
    if (name) {
        query += ' AND b.name LIKE ?';
        params.push(`%${name}%`);
    }
    if (city) {
        query += ' AND ba.city LIKE ?';
        params.push(`%${city}%`);
    }
    if (minRating) {
        query += ' AND b.rating >= ?';
        params.push(minRating);
    }
    if (maxRating) {
        query += ' AND b.rating <= ?';
        params.push(maxRating);
    }
    if (minSize) {
        query += ' AND b.kvadratmeter >= ?';
        params.push(minSize);
    }
    if (maxSize) {
        query += ' AND b.kvadratmeter <= ?';
        params.push(maxSize);
    }

    // Perform the query with the parameters
    connection.query(query, params, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Server error');
        }
        // Send results as a response
        res.json(results);
    });
});



// Endpoint for at få kun 1 bar med et specifikt navn
app.get('/bars/name/:name', (req, res) => {
    const barName = `%${req.params.name}%`; // Add wildcards for partial matching
    const query = `
    SELECT b.bar_id, b.name, b.rating, b.kvadratmeter,
           ba.street_name, ba.street_number, ba.zip_code, ba.city,
           bl.lat, bl.lng
    FROM Bar b
    JOIN bar_address ba ON b.bar_address_id = ba.address_id
    JOIN bar_location bl ON b.bar_location_id = bl.location_id
    WHERE b.name LIKE ?
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
// Endpoint for at tilføje en ny bar
app.post('/bars', (req, res) => {
    const {
        name, rating, kvadratmeter,
        street_name, street_number, zip_code, city,
        lat, lng
    } = req.body;

    // Indsæt adresse i bar_address tabellen
    const addressQuery = `
        INSERT INTO bar_address (street_name, street_number, zip_code, city)
        VALUES (?, ?, ?, ?)
    `;
    connection.query(addressQuery, [street_name, street_number, zip_code, city], (error, addressResult) => {
        if (error) {
            console.error('Database insert error (address):', error);
            res.status(500).send('Server error');
        } else {
            const addressId = addressResult.insertId;

            // Indsæt lokation i bar_location tabellen
            const locationQuery = `
                INSERT INTO bar_location (lat, lng)
                VALUES (?, ?)
            `;
            connection.query(locationQuery, [lat, lng], (error, locationResult) => {
                if (error) {
                    console.error('Database insert error (location):', error);
                    res.status(500).send('Server error');
                } else {
                    const locationId = locationResult.insertId;

                    // Indsæt bar i bar tabellen
                    const barQuery = `
                        INSERT INTO bar (name, rating, kvadratmeter, bar_address_id, bar_location_id)
                        VALUES (?, ?, ?, ?, ?)
                    `;
                    connection.query(barQuery, [name, rating, kvadratmeter, addressId, locationId], (error, barResult) => {
                        if (error) {
                            console.error('Database insert error (bar):', error);
                            res.status(500).send('Server error');
                        } else {
                            res.status(201).json({ message: 'Bar added successfully', bar_id: barResult.insertId });
                        }
                    });
                }
            });
        }
    });
});

// Endpoint for at opdatere en bar
app.put('/bars/:ID', (req, res) => {
    const barID = req.params.ID;
    const {
        name, rating, kvadratmeter,
        street_name, street_number, zip_code, city,
        lat, lng
    } = req.body;

    // Opdater bar tabellen
    const barQuery = `
        UPDATE bar
        SET name = ?, rating = ?, kvadratmeter = ?
        WHERE bar_id = ?
    `;
    connection.query(barQuery, [name, rating, kvadratmeter, barID], (error, result) => {
        if (error) {
            console.error('Database update error (bar):', error);
            res.status(500).send('Server error');
        } else {
            // Opdater bar_address tabellen
            const addressQuery = `
                UPDATE bar_address
                SET street_name = ?, street_number = ?, zip_code = ?, city = ?
                WHERE address_id = (
                    SELECT bar_address_id FROM bar WHERE bar_id = ?
                )
            `;
            connection.query(addressQuery, [street_name, street_number, zip_code, city, barID], (error, result) => {
                if (error) {
                    console.error('Database update error (address):', error);
                    res.status(500).send('Server error');
                } else {
                    // Opdater bar_location tabellen
                    const locationQuery = `
                        UPDATE bar_location
                        SET lat = ?, lng = ?
                        WHERE location_id = (
                            SELECT bar_location_id FROM bar WHERE bar_id = ?
                        )
                    `;
                    connection.query(locationQuery, [lat, lng, barID], (error, result) => {
                        if (error) {
                            console.error('Database update error (location):', error);
                            res.status(500).send('Server error');
                        } else {
                            res.send('Bar updated successfully');
                        }
                    });
                }
            });
        }
    });
});

// Endpoint for at slette en bar
app.delete('/bars/:ID', (req, res) => {
    const barID = req.params.ID;

    // Slet bar fra bar tabellen
    const deleteQuery = `
        DELETE FROM bar WHERE bar_id = ?
    `;
    connection.query(deleteQuery, [barID], (error, result) => {
        if (error) {
            console.error('Database delete error:', error);
            res.status(500).send('Server error');
        } else {
            res.send('Bar deleted successfully');
        }
    });
});

// Start serveren på port 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
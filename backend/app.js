const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
});

// der forbindes til databasen:
connection.connect((err) => {
    if (err) throw err;
    console.log('forbindelsen til databasen er oprettet');
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
    `; // b er et alias for bar tabellen. ba er et alias for bar_address tabellen. bl er et alias for bar_location
    // her bliver querien givet til databasen
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database fejl:', error);
            return res.status(500).send('Server fejl');
        }
        // results returneres, hvis der ikke er en error. Results skal altid stå som callback i funktionen.
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

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const values = [username, password];
    const sqlQuery = 'SELECT * FROM user WHERE username = ? AND password = ?';

    connection.query(sqlQuery, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Server fejl');
        }

        if (results.length === 0) {
            return res.status(401).send('Forkert brugernavn eller password. Læs placeholderne i input felterne, eller opret en account.');
        }

        res.status(200).json({success: true});
    });
});

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    const values = [username, password]

    const checkQuery = 'SELECT * FROM user WHERE username = ?';
    connection.query(checkQuery, [username], (error, results) => {
        // der tjekkets for fejl og om brugernavnet allerede eksisterer i databasen
        if (error) {
            console.error(error);
            return res.status(500).send('Server fejl');
        }

        if (results.length > 0) {
            return res.status(409).send('Brugernavnet eksisterer allerede');
        }

        const insertQuery = 'INSERT INTO user (username, password) VALUES (?, ?)';
        connection.query(insertQuery, values, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Server fejl');
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

                res.status(201).json({bar_id: barResult.insertId});
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
// Endpoint for at opdatere en bar
app.put('/bars/:id', (req, res) => {
    const barId = req.params.id;
    const {
        name, rating, kvadratmeter,
        street_name, street_number, zip_code, city,
        lat, lng
    } = req.body;

    // Opdater Bar tabellen
    const updateBarQuery = 'UPDATE Bar SET name = ?, rating = ?, kvadratmeter = ? WHERE bar_id = ?';
    const barValues = [name, rating, kvadratmeter, barId];

    connection.query(updateBarQuery, barValues, (error, result) => {
        if (error) {
            console.error('Database fejl:', error);
            return res.status(500).send('Server fejl');
        }

        // Opdater bar_address
        const updateAddressQuery = `
            UPDATE bar_address
            SET street_name = ?, street_number = ?, zip_code = ?, city = ?
            WHERE address_id = (SELECT bar_address_id FROM Bar WHERE bar_id = ?)
        `;
        const addressValues = [street_name, street_number, zip_code, city, barId];

        connection.query(updateAddressQuery, addressValues, (error, result) => {
            if (error) {
                console.error('Database fejl:', error);
                return res.status(500).send('Server fejl');
            }

            // Opdater bar_location
            const updateLocationQuery = `
                UPDATE bar_location
                SET lat = ?, lng = ?
                WHERE location_id = (SELECT bar_location_id FROM Bar WHERE bar_id = ?)
            `;
            const locationValues = [lat, lng, barId];

            connection.query(updateLocationQuery, locationValues, (error, result) => {
                if (error) {
                    console.error('Database fejl:', error);
                    return res.status(500).send('Server fejl');
                }

                res.status(200).send('Bar opdateret succesfuldt');
            });
        });
    });
});
app.listen(port, () => {
    console.log(`Serveren kører på port ${port}`);
});

// HTTP STATUS KODER: https://www.semrush.com/blog/http-status-codes/?g_network=g&g_keyword=&g_campaign=NE_SRCH_DSA_Blog_EN&g_acctid=503-093-2724&g_keywordid=dsa-2185834088336&g_adtype=search&g_adid=676326011180&g_campaignid=18350115241&g_adgroupid=159562815492&kw=&cmp=NE_SRCH_DSA_Blog_EN&label=dsa_pagefeed&Network=g&Device=c&utm_content=676326011180&kwid=dsa-2185834088336&cmpid=18350115241&agpid=159562815492&BU=Core&extid=180213783648&adpos=&gad_source=1&gbraid=0AAAAADiv3HReJ_yIC_VFvHD2azUew8POR&gclid=Cj0KCQiAr7C6BhDRARIsAOUKifj5vGL_pXVLwYJW-thfr3gFgL5QqKXJyzcOzF9kPgiH6L7099NO-ygaAn9AEALw_wcB
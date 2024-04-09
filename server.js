require('dotenv').config();
const express = require('express');
const ibmdb = require('ibm_db');
const app = express();
app.use(express.json());

const dbConfig = `DATABASE=${process.env.DB_DATABASE};HOSTNAME=${process.env.DB_SERVER};UID=${process.env.DB_USER};PWD=${process.env.DB_PASSWORD};PORT=${process.env.DB_PORT};PROTOCOL=TCPIP`;

app.post('/query', async (req, res) => {
    ibmdb.open(dbConfig, function (err, conn) {
        if (err) return res.status(500).send(err.message);
        conn.query(req.body.sql, function (err, data) {
            if (err) {
                res.status(500).json({
                    error: err.message,
                    message: 'Failed to execute SQL query'
                });
            } else {
                res.status(200).json({
                    message: 'SQL command completed successfully',
                    data: data
                });
            }
        });
    });
});

app.get('/test-db', async (req, res) => {
    ibmdb.open(dbConfig, function (err, conn) {
        if (err) return res.status(500).send(err.message);
        conn.query("SELECT TABNAME FROM SYSCAT.TABLES WHERE TYPE='T'", function (err, data) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                console.log(res)
                res.json(data);
            }
            conn.close(function () {
                console.log('Connection closed.');
            });
        });
    });
});

const PORT = process.env.PORT || 5478;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

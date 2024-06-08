const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('database.db');
const sqlFile = 'dump-postgres-202406071849.sql';

router.get('/import-database', async function (req, res) {
    fs.readFile(sqlFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading SQL file:', err);
            return;
        }

        db.exec(data, (err) => {
            if (err) {
                console.error('Error executing SQL:', err);
            } else {
                console.log('SQL file executed successfully!');
            }
        });
    });
});

const { Pool } = require('pg');
const database = process.env.DATABASE_URL;

let pool;
if (!database) {
    const { username, local_db_name } = require('./config.js');
    pool = new Pool({
        user: username,
        database: local_db_name,
    })
} else {
    pool = new Pool({
        connectionString: database,
        ssl: {
            rejectUnauthorized: false
        }
        host: 'localhost',
        user: 'student',
        database: 'friendtrips',
        port: 5432
    });
}

pool.connect(() => {
    console.log('connected to postgres db')
});

module.exports = pool;

const { Pool } = require('pg');
const database = process.env.DATABASE_URL;

let pool;
if (!database) {
    pool = new Pool({
        user: 'root',
        database: 'friendtrips',
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

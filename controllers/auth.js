const db = require('../database/index.js');

module.exports = {
    checkUserExist: (type, val) => {
        return new Promise((res, rej) => {
            console.log('type, val', type, val);
            let query = {
                text: `SELECT * FROM users WHERE ${type} = $1`,
                values: [val],
            }
            db.query(query)
                .then((results) => {
                    // console.log(results);
                    res(results.rows[0])
                }
                )
                .catch((err) => rej(err))
        })
    }
}

const _ = require('lodash');

module.exports = {
    inserter: (table, items) => {
        let validKeys = _.keys(items).join(', '),
		countKeys = _.reduce(items, (results) => {
			results.push('$' + (results.length + 1))
			return results
		}, []).join(', '),
		values = _.values(items)
	return {
		values,
		text: `INSERT INTO ${table} (${validKeys}) VALUES (${countKeys}) RETURNING *`,
	    }
    },
    selectAll: (table, column=null, value=null) => {
        let condition = ` WHERE ${column} = $1`;
        let query = `SELECT * FROM ${table}`;
        let values = [];
        if(column && value) {
            query += condition;
            values.push(value);
        }
        return {
            values: values,
            text: query
        }
    }
}
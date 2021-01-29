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
    },
    selectAllWithUsernames: function(table, column, value) {
        return {
            values: [value],
            text:`SELECT users.username, ${table}.* FROM ${table}, users WHERE users.user_id = ${table}.user_id AND ${table}.${column} = $1`,
        }
    },
    deleter: (table, column, value) => {
        return {
            values: [value],
            text: `DELETE FROM ${table} WHERE ${column} = $1`
        }
    },
    updater: (table, setColumnName, setValue, conditionColumn, conditionValue) => {
      return `UPDATE ${table} SET ${setColumnName} = '${setValue}' WHERE ${conditionColumn} = ${conditionValue}`
    }
}


// UPDATE courses
// SET published_date = '2020-08-01'
// WHERE course_id = 3;
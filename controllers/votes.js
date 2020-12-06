const db = require('../database/index.js');
const {inserter, selectAll} = require('./queries.js');

module.exports = {
    addVote: (voteData) => {
        return new Promise((resolve, reject) => {
            let {type, user_id, suggestion_id} = voteData;
            let num_value;
            if(type === '+') {
                num_value = 1;
            } else {
                num_value = -1;
            }
            voteData.num_value = num_value;

            let query = inserter('votes', voteData);
            db.query(query)
                .then((returnedData) => resolve(returnedData))
                .catch((err) => resolve(err))
        })
    },
    getVotes: (trip_id) => {
        return new Promise((resolve, reject) => {
            let query = selectAll('votes', 'trip_id', trip_id);
            db.query(query)
                .then((returnedData) => {
                    resolve(returnedData)
                })
                .catch((err) => resolve(err))
        })
    }
}

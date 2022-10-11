const db = require('../db/connection')

exports.fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then(({rows}) => {
        return rows
    })
}
exports.fetchReviews = (review_id) => {
    return db.query(`SELECT * FROM reviews
    WHERE review_id = $1;`, [review_id])
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status:404, msg: 'does not exist'})
        }
        return rows
    })
}
exports.fetchUsers = () => {
    return db.query(`SELECT users. * FROM users;`)
    .then(({rows}) => {
        return rows
    })
}
exports.insertVotes = (review_id, votes) => {
    return db.query(`UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`, [ votes, review_id])
    .then(({rows}) => {
        console.log(rows)
        return rows
    })
}
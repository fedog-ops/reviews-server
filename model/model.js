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
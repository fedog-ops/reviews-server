const db = require('../db/connection')

exports.fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then(({rows}) => {
        return rows
    })
}
exports.fetchReviews = () => {
    return db.query(`SELECT * FROM reviews
    WHERE review_id = 1;`)
    .then(({rows}) => {
        console.log(rows, 'in fetchReviews model')
        return rows
    })
}
const db = require('../db/connection')

exports.fetchCatagories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then(({rows}) => {
        return rows
    })
}
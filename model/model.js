const db = require('../db/connection')

exports.fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
    .then(({rows}) => {
        return rows
    })
}
exports.fetchReviewsById = (review_id) => {
    return db.query(
`SELECT reviews.* , 
COUNT(comments.review_id) ::INT AS comment_count 
FROM reviews

LEFT JOIN comments
ON comments.review_id = reviews.review_id

WHERE reviews.review_id = $1

GROUP BY reviews.review_id
ORDER BY reviews.review_id;`, [review_id]
    )
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
exports.ammendVotes = (review_id, votes) => {
    return db.query(`UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`, [ votes, review_id])
    .then(({rows}) => {
        if(rows.length === 0){
        return Promise.reject({status:404, msg: 'does not exist'})
    }
        return rows
    }) 
    
}
exports.fetchReviews = () => {
    return db.query(
        `SELECT reviews.* , 
        COUNT(comments.review_id) ::INT AS comment_count 
        FROM reviews
        
        LEFT JOIN comments
        ON comments.review_id = reviews.review_id
        
        GROUP BY reviews.review_id
        ORDER BY created_at DESC;`)
            .then(({rows}) => {
                if(rows.length === 0){
                    return Promise.reject({status:404, msg: 'does not exist'})
                }
                return rows
            })
    
}
exports.fetchCommentByReviewId = () => {
    return db.query(
        `SELECT * FROM comments
         WHERE review_id = 1;`)
        .then(({rows}) => {
            // if(rows.length === 0){
            //     return Promise.reject({status:404, msg: 'does not exist'})
            // }
            return rows
        })
}
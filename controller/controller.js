const {fetchCategories, fetchReviews} = require('../model/model')

exports.getCategories = (req, res, next) => {
   fetchCategories().then((categories) => {
    res.status(200).send(categories)
   }).catch((err) => {
    next(err)
   })
}
exports.getReviews = (req, res, next) => {
const review_id = req.params.review_id
    fetchReviews(review_id).then((reviews) => {
        res.status(200).send({review: reviews[0]})
    }).catch((err) => {
        next(err)
    })
}
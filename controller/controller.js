const {fetchCategories, fetchReviews} = require('../model/model')

exports.getCategories = (req, res, next) => {
   fetchCategories().then((categories) => {
    res.status(200).send(categories)
   }).catch((err) => {
    next(err)
   })
}
exports.getReviews = (req, res, next) => {
    console.log('in getReviews controller')
    fetchReviews().then((reviews) => {
        res.status(200).send(reviews[0])
    })
}
const {
  fetchCategories,
  fetchReviewsById,
  fetchUsers,
  ammendVotes,
  fetchReviews
} = require("../model/model");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      next(err);
    });
};
exports.getReviewsById = (req, res, next) => {
  const review_id = req.params.review_id;
  fetchReviewsById(review_id)
    .then((reviews) => {
      res.status(200).send({ review: reviews[0] });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getUsers = (req, res, next) => {
  fetchUsers().then((data) => {
    res.status(200).send({ users: data });
  });
};
exports.updateVotes = (req, res, next) => {
const review_id = req.params.review_id;
const votesAdd = req.body.inc_votes

  ammendVotes(review_id, votesAdd).then((data) => {
    res.status(200).send({user: data[0]});
  }).catch((err) => {
    next(err);
  });
};
exports.getReviews = (req, res, next) => {
    fetchReviews()
    .then((ans) => {
        res.status(200).send({reviews: ans});
    }).catch((err) => {
        next(err)
    })
}
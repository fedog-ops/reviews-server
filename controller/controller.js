const {
  fetchCategories,
  fetchReviewsById,
  fetchUsers,
  ammendVotes,
  fetchReviews,
  fetchCommentByReviewId,
  addComment,
  deleteComment
} = require("../model/model");

const endpoints = require('../endpoints.json')

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
  const {order_by, sort_by, slug} = req.query
    fetchReviews(order_by, sort_by, slug)
    .then((reviews) => {
      res.status(200).send({reviews: reviews});
    }).catch((err) => {
        next(err)
    })
}
exports.getCommentByReviewId = (req, res, next) => {
const review_id = req.params.review_id;

const promises = [
  fetchCommentByReviewId(review_id), 
  fetchReviewsById(review_id)
]

  Promise.all(promises)
    .then((comment) => {
      
      res.status(200).send({ comments: comment[0] });
    })
    .catch((err) => {
      next(err);
    });
}
exports.postComment = (req, res, next) => {
 
 const review_id = req.params.review_id;
 const {username, body} = req.body
  addComment(review_id, username, body).then((newComment) => {
    res.status(201).send({comment: newComment[0]})
  }) .catch((err) => {
    next(err);
  });
}

exports.removeComment = (req, res, next) => {
 
  const comment_id = req.params.comment_id;

  deleteComment(comment_id).then((removedComment) => {
     res.sendStatus(204)
   }).catch((err) => {
   next(err)
   });
  }

  exports.getAPI = (req, res, next) => {
    res.send(endpoints)
  }
const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories;`).then(({ rows }) => {
    return rows;
  });
};
exports.fetchReviewsById = (review_id) => {
  return db
    .query(
      `SELECT reviews.* , 
COUNT(comments.review_id) ::INT AS comment_count 
FROM reviews

LEFT JOIN comments
ON comments.review_id = reviews.review_id

WHERE reviews.review_id = $1

GROUP BY reviews.review_id
ORDER BY reviews.review_id;`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "does not exist" });
      }
      return rows;
    });
};
exports.fetchUsers = () => {
  return db.query(`SELECT users. * FROM users;`).then(({ rows }) => {
    return rows;
  });
};
exports.ammendVotes = (review_id, votes) => {
  return db
    .query(
      `UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`,
      [votes, review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "does not exist" });
      }
      return rows;
    });
};
exports.fetchReviews = (order_by = "DESC", sort_by = "created_at", slug = null) => {
  const allowedOrders = ["ASC", "DESC"];
  const allowedSorts = [
    " title",
    "designer",
    "owner",
    "review_img_url",
    "review_body",
    "category",
    "created_at",
    "votes",
  ];
  if (!allowedOrders.includes(order_by) || !allowedSorts.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "invalid data type" });
  }
  let slugInfo = ''
  if(slug) slugInfo=` WHERE reviews.category = '${slug}' `
    
  
  return db
    .query(
      `SELECT reviews.* , 
       
        COUNT(comments.review_id) ::INT AS comment_count 
        FROM reviews
       
        LEFT JOIN comments
        ON comments.review_id = reviews.review_id
        LEFT JOIN users ON reviews.owner = users.username`

       + slugInfo +
        
        ` GROUP BY reviews.review_id
        ORDER BY ${sort_by} ${order_by};`
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "does not exist" });
      }
      return rows;
    });
};
exports.fetchCommentByReviewId = (review_id) => {
  return db
    .query(
      `SELECT * FROM comments
      
      LEFT JOIN users ON comments.author = users.username
      
      WHERE review_id = $1
   
      ORDER BY created_at DESC;`,
      [review_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.addComment = (review_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments
    (body, author, review_id)
    VALUES
    ($1, $2, $3)
    RETURNING *;`,
      [body, username, review_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.deleteComment = (comment_id) => {
    return db.query(`
    DELETE FROM comments 
    WHERE comment_id = $1
    RETURNING *;`, [comment_id]).then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "does not exist" });
      }
      return rows[0];
    })
}
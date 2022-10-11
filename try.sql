DROP DATABASE IF EXISTS nc_games_test;
DROP DATABASE IF EXISTS nc_games;

CREATE DATABASE nc_games_test;
CREATE DATABASE nc_games;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;


  CREATE TABLE categories (
    slug VARCHAR PRIMARY KEY,
    description VARCHAR
  );

  CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    avatar_url VARCHAR
  );

  CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    category VARCHAR NOT NULL REFERENCES categories(slug),
    designer VARCHAR,
    owner VARCHAR NOT NULL REFERENCES users(username),
    review_body VARCHAR NOT NULL,
    review_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    created_at TIMESTAMP DEFAULT NOW(),
    votes INT DEFAULT 0 NOT NULL
  );
  CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    body VARCHAR NOT NULL,
    review_id INT REFERENCES reviews(review_id) NOT NULL,
    author VARCHAR REFERENCES users(username) NOT NULL,
    votes INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

SELECT review_id, COUNT(review_id)
FROM comments;
-- LEFT JOIN reviews
-- ON comments.review_id = reviews.review_id;
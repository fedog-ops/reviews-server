const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("3 GET/api/catagories", () => {
  test("status 200: return an array of catagories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const categories = body;
        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  test("status 404: produce error message if table does not exist", () => {
    return request(app)
      .get("/api/doesnotexist")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "path does not exist" });
      });
  });
});
describe("4 GET/api/reviews:review_id", () => {
  describe("task 4", () => {
    test("status 200: return an array of reviews", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.review).toBeInstanceOfArray;
          if (body.review.length > 0) {
            body.review.forEach((user) => {
              expect(user).toEqual(
                expect.objectContaining({
                  review_id: expect(1),
                  title: expect("Agricola"),
                  category: expect("euro game"),
                  designer: expect("Uwe Rosenberg"),
                  owner: expect("mallionaire"),
                  review_body: expect("Farmyard fun!"),
                  review_img_url: expect(
                    "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
                  ),
                  created_at: expect("2021-01-18T10:00:20.514Z"),
                  votes: expect(1),
                })
              );
            });
          }
        });
    });
    test("status 400: invalid data type", () => {
      return request(app)
        .get("/api/reviews/banana")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid data type");
        });
    });
    test("status 404: does not exist in database", () => {
      return request(app)
        .get("/api/reviews/9999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("does not exist");
        });
    });
  });
});

describe("GET /api/users", () => {
  test("status 200: returns array of objects including username, name, avatar_url", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toBeInstanceOfArray;
        if (body.users.length > 0) {
          body.users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
              })
            );
          });
        }
      });
  });
  test("status 404: path does not exist", () => {
    return request(app)
      .get("/api/fail")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path does not exist");
      });
  });
});

describe("POST reviews/:review_id", () => {
  test("Update votes in reviews with given object ", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: 1 })
      .then(({ body }) => {
        expect(body.user.votes).toBe(2);
      });
  });
  test("status 400: invalid data type", () => {
    return request(app)
      .patch("/api/reviews/coop")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
  test("status 404: path does not exist", () => {
    return request(app)
      .patch("/api/fail")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path does not exist");
      });
  });
});

describe("7 GET/api/reviews:review_id WITHN COMMENTS :D", () => {
  test("status 200: return an array of reviews", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(
          expect.objectContaining({
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
            comment_count: 3,
            review_id: 2,
          })
        );
      });
  });

  test("status 400: invalid data type", () => {
    return request(app)
      .patch("/api/reviews/coop")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
  test("status 404: path does not exist", () => {
    return request(app)
      .patch("/api/fail")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path does not exist");
      });
  });
});
describe("8 GET/api/reviews DATE DESC", () => {
  test("status 200: return an array of reviews in order of created_at", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("contains the correct properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        if (body.reviews.length > 0) {
          body.reviews.forEach((review) => {
            expect(review).toEqual(
              expect.objectContaining({
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_body: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              })
            );
          });
        }
      });
  });
  test("status 404: path does not exist", () => {
    return request(app)
      .patch("/api/fail")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path does not exist");
      });
  });
});

describe("9. GET /api/reviews/:review_id/comments", () => {
  test("object containing the correct properties", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        if (body.comments.length > 0) {
          body.comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                review_id: expect.any(Number),
              })
            );
          });
        }
      });
  });
  test("status 200: return an array of reviews in order of created_at DESC", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("status 200: review_id 1 >>>>> accepts empty array", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("status 404: review_id 999999 >>>>> does not exist", () => {
    return request(app)
      .get("/api/reviews/9999999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("does not exist");
      });
  });
  test("status 400: reviews/banana/comments >>>> invalid data type", () => {
    return request(app)
      .get("/api/reviews/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
});

describe("Task 10", () => {
  test("status 201: adds object containing username and body", () => {
    const entry = { username: "mallionaire", body: "test for task 10" };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(entry)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toEqual(
          expect.objectContaining({
            body: "test for task 10",
            votes: 0,
            author: "mallionaire",
            review_id: 1,
            comment_id: 7,
          })
        );
      });
  });
  test("status 404: invalid username used", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "fedog", body: "lmldm" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("does not exist");
      });
  });
  test("status 404: non existent review_id", () => {
    return request(app)
      .post("/api/reviews/999999999/comments")
      .send({ username: "mallionaire", body: "lmldm" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("does not exist");
      });
  });
  test("status 400: empty comment body", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("invalid data type");
      });
  });
  test("status 404: path does not exist", () => {
    return request(app)
      .get("/api/reviews/3/commentwrongpath")
      .send({ username: "mallionaire", body: "lmldm" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path does not exist");
      });
  });
});

describe("Task 11 update getReviews with quieres", () => {
 
  it("slug query", () => {
    return request(app)
      .get("/api/reviews?slug=dexterity")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("votes", { descending: false });
      });
  });
  it("sort by", () => {
    return request(app)
      .get("/api/reviews?order_by=ASC&sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("votes", { descending: false });
      });
  });
  it("sort by votes with DESC default", () => {
    return request(app)
      .get("/api/reviews?&sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("votes", { descending: true });
      });
  });
  it("order by ASC with created_at default", () => {
    return request(app)
      .get("/api/reviews?&order_by=ASC")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("created_at", { descending: false });
      });
  });
  it("400: invalid order_by given", () => {
    return request(app)
      .get("/api/reviews?&order_by=FAIL")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
  it("400: invalid sort_by given", () => {
    return request(app)
      .get("/api/reviews?&sort_by=FAIL")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
});
describe("12 - delete comment", () => {
  test("deletes given comment_id", () => {
    return request(app).delete("/api/comments/3").expect(204);
  });
  test("status 404: delete comment_id 999999", () => {
    return request(app)
      .delete("/api/comments/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("does not exist");
      });
  });
  test("status 404: delete comment_id lemon", () => {
    return request(app)
      .delete("/api/comments/lemon")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
});

const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  if (db.end) db.end();
});


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
            if (body.review.length > 0) {
              body.review.forEach((user) => {
                expect(body.review).toEqual(
                  expect.objectContaining({
                    title: expect("Jenga"),
                    designer: expect("Leslie Scott"),
                    owner: expect("philippaclaire9"),
                    review_img_url: expect(
                      "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
                    ),
                    review_body: expect("Fiddly fun for all the family"),
                    category: expect("dexterity"),
                    created_at: expect("2021-01-18T10:01:41.251Z"),
                    votes: expect(5),
                    comment_count: expect(3),
                    review_id: expect(2),
                  })
                );
              });
            }
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
  describe.only("8 GET/api/reviews DATE DESC", () => {
   
    test("status 200: return an array of reviews in order of created_at", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toBeSortedBy('created_at', {descending:true})
        });
    });
    test("contains the correct properties")
});
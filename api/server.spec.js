const supertest = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig")

describe("server.js", () => {
beforeEach(async () => {
    await db("users").truncate();
});

  describe("GET /", () => {
    it("should return 200 OK", () => {
        return supertest(server)
            .get("/api/jokes")
            .then(res => {
                // jest assertion
                expect(res.status).toBe(401);
            });
    });

    it("should return api: up", () => {
        return supertest(server)
            .get("/api/jokes")
            .then(res => {
                // jest assertion
                expect(res.body.api).toBe(undefined);
            });
    });

    it("should return JSON", () => {
        return supertest(server)
            .get("/api/jokes")
            .then(res => {
                // jest assertion
                expect(res.type).toMatch(/json/i);
            });
    });
});
  
  describe("POST /register", () => {
    it("should save the user", () => {

        return supertest(server)
        .post("/api/auth/register")
        .send({ username: "username", password: "pass" })
        .then(res => {
            expect(res.body.name).toBe(undefined);
        });
    });

    
  
  });
  
  describe("POST /login", () => {
    it("should return status code 404", async () => {
      const res = await supertest(server)
        .post("/login")
        .send({ username: "username", password: "pass" });
      expect(res.status).toBe(404);
    });
  
    it("shouldn't have username", async () => {
      const res = await supertest(server)
        .post("/login")
        .send({ username: "username", password: "pass" });
      expect(res.body.username).toBe(undefined);
    });
  });

})
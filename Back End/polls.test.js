const request = require("supertest");
const app = require("./src/app");

describe("Poll API", () => {
  test("Should create a new poll", async () => {
    const response = await request(app)
      .post("/api/polls")
      .send({
        question: "What's your favorite color?",
        options: ["Red", "Blue", "Green"],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.question).toBe("What's your favorite color?");
  });

  test("Should handle invalid poll data", async () => {
    const response = await request(app).post("/api/polls").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});

afterAll((done) => {
  done();
});

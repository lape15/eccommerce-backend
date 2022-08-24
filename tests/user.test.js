const request = require("supertest");

const routes = require("../index");

beforeAll(async () => {
  console.log("connect");
});

describe("Test user handlers", () => {
  it("creates user when the endpoint is called and passed the right payload", async () => {
    const res = await request(routes).get("/api/users");
    expect(res.statusCode).toBe(200);
  });

  it("saves users when the right payload is passed", async () => {
    const req = {
      firstName: "Nurudeen",
      email: "nuru@gmail.com",
      password: "snoopilngirl",
    };
    const res = await request(routes)
      .post("/api/users")
      .expect("Content-Type", /json/)
      .send(req);
    expect(res.statusCode).toBe(200);
  });

  it("It returns right error message if passowrd isn't passed in", async () => {
    const req = {
      firstName: "Nurudeen",
      email: "nuru@gmail.com",
    };
    const res = await request(routes)
      .post("/api/users")
      .expect("Content-Type", /json/)
      .send(req);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("No password was found");
  });

  it("doesn't create user if req.body has wrong params", async () => {
    const req = {
      email: "nuru@gmail.com",
      password: "snoopilngirl",
    };
    const res = await request(routes)
      .post("/api/users")
      .expect("Content-Type", /json/)
      .send(req);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error creating user");
  });
});

const request = require("supertest");
const express = require("express");
const user = require("../handlers/user");
const router = require("../routes/api");
const app = new express();
app.use("/api", router);

describe("Test user handlers", async () => {
  it("creates user when the endpoint is called and passed the right payload", () => {
    const req = {
      body: {
        email: "nuru@gmail.com",
        password: "snoopilngirl",
      },
    };
    // const res = {};
    // const res = await request(app).get('/api/post');
    // expect(res.statusCode).toBe(200);
  });
});

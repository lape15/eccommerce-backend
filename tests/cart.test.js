const request = require("supertest");

const routes = require("../index");

let token = "";
const req = {
  firstName: "Nurudeen",
  email: "nuru@gmail.com",
  password: "snoopilngirl",
};

const user = {
  email: "nuru@gmail.com",
  password: "snoopilngirl",
};

const item = {
  name: "Red Dress",
  imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
  price: 3,
  quantity: 8,
};

// Note; I am completing the flow of a real user trying to use the cart in the before each to enable testing out the api as it should.
// Simiulating user creation and login in and adding a single item to seed the test database with

beforeAll(async () => {
  await request(routes).post("/api/users").send(req);
  const response = await request(routes).post("/api/login").send(user);
  token = response.body.token;
  await request(routes)
    .post("/api/cart")
    .set("Authorization", `Bearer ${token}`)
    .expect("Content-Type", /json/)
    .send(item);
});

describe("Cart item handler", () => {
  it("creates cart item", async () => {
    const item = {
      name: "Pink cap",
      imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
      price: 3,
      quantity: 8,
    };
    const res = await request(routes)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .send(item);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Item Added");
  });

  it("updates the item property if the item already exists in cart", async () => {
    const item = {
      name: "Red Dress",
      imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
      price: 3,
      quantity: 8,
    };
    const res = await request(routes)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .send(item);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Cart Updated");
  });
});

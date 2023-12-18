const request = require("supertest");
const app = require("../server.js");
const prisma = require("../db/index.js");

describe("POST /api/login", () => {
  let testUser;

  beforeAll(async () => {
    // Create a test user in the testing database
    testUser = await prisma.user.create({
      data: {
        userName: "example",
        password: "password",
        email: "example@gmail.com",
        firstName: "example",
        lastName: "example",
      },
    });
  });

  afterAll(async () => {
    // Delete the test user from the testing database
    await prisma.user.delete({ where: { id: testUser.id } });
    await prisma.$disconnect();
  });

  it("should return a JWT token upon successful login", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "example", password: "password" })
      .expect(200);

    // Assert that the response contains a token
    expect(res.body).toHaveProperty("token");
    // Assert that the response contains a success property
    expect(res.body).toHaveProperty("success", true);
  });

  it("should return Unauthorized for invalid credentials", async () => {
    await request(app)
      .post("/login")
      .send({ username: "invalid", password: "wrongpassword" })
      .expect(401);
    // Assert that the response contains a success property
    expect(res.body).toHaveProperty("success", false);
  });
});

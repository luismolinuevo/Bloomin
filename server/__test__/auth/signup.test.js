import request from "supertest";
import createServer from "../../index.js";
import prisma from "../../db/index.js";
import argon2 from "argon2";

let server;
const runServer = async () => {
  server = await createServer();
};

runServer();

describe("POST /api/login", () => {
  let testUser;

  beforeAll(async () => {
    // Create a test user in the testing database
    testUser = await prisma.user.create({
      data: {
        userName: "example",
        password: await argon2.hash("password"),
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

  it("should return 404 for not found user", async () => {
    const res = await request(server)
      .post("/api/login")
      .send({ userName: "invalid", password: "wrongpassword" })
      .expect(404);
    // Assert that the response contains a success property
    expect(res.body).toHaveProperty("success", false);
  });

  it("should return a JWT token upon successful login", async () => {
    const res = await request(server)
      .post("/api/login")
      .send({ userName: "example", password: "password" })
      .expect(200);

    // Assert that the response contains a token
    expect(res.body).toHaveProperty("token");
    // Assert that the response contains a success property
    expect(res.body).toHaveProperty("success", true);
  });

  it("should return Unauthorized for invalid password", async () => {
    const res = await request(server)
      .post("/api/login")
      .send({ userName: "example", password: "wrongpassword" })
      .expect(401);
    // Assert that the response contains a success property
    expect(res.body).toHaveProperty("success", false);
  });
});

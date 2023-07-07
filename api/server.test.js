const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");
// testleri buraya yazın

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

test("[0] Testler çalışır durumda]", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("AUTH", () => {
  test("[1] register user", async () => {
    const payload = { username: "enes", password: "1234" };
    const res = await request(server).post("/api/auth/register").send(payload);
    expect(res.body).toHaveProperty("id", 1);
  });
});

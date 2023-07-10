const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

test("[0] sanity check", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("AUTH", () => {
  test("[1] register", async () => {
    const payload = { username: "serkan", password: "1234" };
    const res = await request(server).post("/api/auth/register").send(payload);
    expect(res.body).toHaveProperty("id", 1);
  });
  test("[2] register failure", async () => {
    const payload = { username: "serkan", password: "12345" };
    const res = await request(server).post("/api/auth/register").send(payload);
    expect(res.body).toHaveProperty("message", "User zaten tanımlı");
  });
  test("[3] login", async () => {
    const payload = { username: "serkan", password: "1234" };
    const res = await request(server).post("/api/auth/login").send(payload);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("message", "welcome serkan");
  });
  test("[4] login failure", async () => {
    const payload = { username: "mahmut", password: "1234" };
    const res = await request(server).post("/api/auth/login").send(payload);
    expect(res.body).not.toHaveProperty("token");
    expect(res.body).not.toHaveProperty("message", "serkan geri geldi");
  });
});

describe("BİLMECELER", () => {
  test("[5] get bilmeceler", async () => {
    const res = await request(server).get("/api/bilmeceler/");
    expect(res.body).toHaveProperty("message", "Token gereklidir");
  });
  test("[6] get bilmeceler", async () => {
    const payload = { username: "serkan", password: "1234" };
    const loginRes = await request(server)
      .post("/api/auth/login")
      .send(payload);
    //expect(loginRes.body.token.username).toBe('serkan')

    const res = await request(server)
      .get("/api/bilmeceler/")
      .set("Authorization", loginRes.body.token);
    expect(res.body).toHaveLength(3);
  });
  test("[7] post bilmeceler", async () => {
    const payload = { username: "serkan", password: "1234" };
    const loginRes = await request(server)
      .post("/api/auth/login")
      .send(payload);
    //expect(loginRes.body.token.username).toBe('serkan')
    const bilmecepayload = { bilmece: "test" };
    const res = await request(server)
      .post("/api/bilmeceler/")
      .set("Authorization", loginRes.body.token)
      .send(bilmecepayload);
    expect(res.body).toHaveProperty("bilmece", "test");
  });
});

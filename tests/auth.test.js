const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany();
});

describe("User Registration & Login", () => {
    const baseUser = {
        firstname: "Cata",
        lastname: "Vasiu",
        birthDate: "2002-07-10",
        password: "123",
        role: "client",
        gender: "female",
    };

    const user1 = {
        ...baseUser,
        email: "cata@gmail.com",
        phone: "9876543210",
    };

    const user2 = {
        ...baseUser,
        email: "trainer@gmail.com",
        phone: "0123123123",
    };

    it("should register a new user successfully and return a token", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...user2, uuid: uuidv4() });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "User registered");
        expect(res.body).toHaveProperty("token");
    });

    it("should not allow duplicate email or phone on registration", async () => {
        await request(app)
            .post("/auth/register")
            .send({ ...user1, uuid: uuidv4() });

        const res = await request(app)
            .post("/auth/register")
            .send({ ...user1, uuid: uuidv4() });

        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("message", "Email or phone already exists");
    });

    it("should login successfully with correct credentials", async () => {
        await request(app)
            .post("/auth/register")
            .send({ ...user1, uuid: uuidv4() });

        const res = await request(app).post("/auth/login").send({ email: user1.email, password: user1.password });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "User logged in");
        expect(res.body).toHaveProperty("token");
    });

    it("should return 404 if login email does not exist", async () => {
        const res = await request(app).post("/auth/login").send({ email: "ale@gmail.com", password: "123" });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("message", "User does not exist");
    });

    it("should return error if password is incorrect", async () => {
        await request(app)
            .post("/auth/register")
            .send({ ...user1, uuid: uuidv4() });

        const res = await request(app).post("/auth/login").send({ email: user1.email, password: "12345" });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("message", "Incorrect password");
    });
});

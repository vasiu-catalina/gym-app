const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const User = require("../models/User");

let mongoServer;
let token;
let userId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Register + login user to get token
    const res = await request(app).post("/auth/register").send({
        firstname: "Cata",
        lastname: "Vasiu",
        birthDate: "2002-07-10",
        email: "user@example.com",
        password: "123",
        phone: "9876543210",
        role: "client",
        gender: "female",
    });

    token = res.body.token;

    const user = await User.findOne({ email: "user@example.com" });
    userId = user._id.toString();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    // await User.deleteMany();
});

describe("User Routes (auth protected)", () => {
    it("should get the user profile", async () => {
        const res = await request(app).get(`/users/${userId}`).set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.user.email).toBe("user@example.com");
    });

    it("should update the user profile", async () => {
        const res = await request(app)
            .patch(`/users/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ firstname: "Updated" });

        expect(res.statusCode).toBe(200);
        expect(res.body.user.firstname).toBe("Updated");
    });

    it("should change the user password", async () => {
        const res = await request(app)
            .put(`/users/${userId}/change-password`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                password: "123",
                newPassword: "456",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Password changed");
    });

    it("should delete the user", async () => {
        const res = await request(app).delete(`/users/${userId}`).set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(204);
    });
});

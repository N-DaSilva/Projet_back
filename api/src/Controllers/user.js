const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserObject = require("../Models/user");

const config = require("../config");

const JWT_MAX_AGE = "6m"; // 6 months

router.get("/", async (req, res) => {
    return res.json({ message: "User endpoint is working." });
})

router.post("/signin", async (req, res) => {
    let { username, password } = req.body;
    username = (username || "").trim();

    if (!username || !password)
        return res.status(400).send({
            ok: false,
            code: "USERNAME_AND_PASSWORD_REQUIRED",
            message: "Username and password are required",
        });

    try {
        const user = await UserObject.findOne({ username });
        
        if (!user) {
            return res.status(401).send({
                ok: false,
                code: "INVALID_USER",
                message: "User doesn't exist",
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send({
                ok: false,
                code: "PASSWORD_INVALID",
                message: "Password is invalid",
            });
        }

        const token = jwt.sign({ _id: user.id }, config.SECRET, {
            expiresIn: JWT_MAX_AGE,
        });

        return res.status(200).send({ ok: true, token, data: user });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            code: "SERVER_ERROR"
        });
    }
});


router.post("/signup", async (req, res) => {
    let { username, password } = req.body;
    username = (username || "").trim();

    try {
        const existingUser = await UserObject.findOne({ username });
        if (existingUser) {
            return res.status(401).send({
                ok: false,
                code: "USERNAME_TAKEN",
                message: "Username already taken."
            });
        }

        const token = jwt.sign({ _id: UserObject.id }, config.SECRET, {
            expiresIn: JWT_MAX_AGE,
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserObject.create({ username, password: hashedPassword });

        return res.status(200).send({ ok: true, token, data: newUser });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            code: "SERVER_ERROR"
        });
    }
});


//delete after testing

router.get("/flush", async (req, res) => {
    try {
        await UserObject.deleteMany({});
        return res.status(200).send({ ok: true, message: "All users deleted." });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            code: "SERVER_ERROR"
        });
    }
})

module.exports = router;
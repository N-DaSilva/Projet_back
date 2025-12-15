const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//use passport to check jwt token

const UserObject = require("../Models/user");

const config = require("../config");

const JWT_MAX_AGE = "6m"; // 6 months

router.get("/", async (req, res) => {
    try {
        const users = await UserObject.find().select("-password").lean();
        return res.status(200).send({ ok: true, data: users });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            code: "SERVER_ERROR"
        });
    }
})

router.get("/find/:id", async (req, res) => {
    const { id } = req.params;

    if (id.length < 24) {
        return res.status(400).send({
            ok: false,
            code: "INVALID_ID",
            message: "ID is not valid"
        });
    }
    
    try {
        const user = await UserObject.findById(id);

        if (!user){
            return res.status(404).send({
                ok: false,
                code: "USER_NOT_FOUND",
                message: "User not found"
            })
        }

        return res.status(200).send({ ok: true, data: user });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            code: "SERVER_ERROR"
        });
    }
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

router.put("/:id/score", async (req, res) => {
    const { id } = req.params;
    const { score } = req.body;

    if (id.length < 24) {
        return res.status(400).send({
            ok: false,
            code: "INVALID_ID",
            message: "ID is not valid"
        });
    }

    if (typeof score !== "number" || score < 0) {
        return res.status(400).send({
            ok: false,
            code: "INVALID_SCORE",
            message: "Score must be a positive number"
        });
    }

    try {
        const user = await UserObject.findById(id);

        if (!user) {
            return res.status(404).send({
                ok: false,
                code: "USER_NOT_FOUND",
                message: "User not found"
            });
        }

        user.score = score;
        await user.save();

        return res.status(200).send({ ok: true, data: user });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            code: "SERVER_ERROR"
        });
    }
});

router.get("/leaderboard", async (req, res) => {
    try {
        const topUsers = await UserObject.find()
        .sort({ score: -1})
        .limit(100);

        return res.status(200).send({ ok: true, data: topUsers });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            code: "SERVER_ERROR"
        })
    }
})


//delete after testing

// router.get("/flush", async (req, res) => {
//     try {
//         await UserObject.deleteMany({});
//         return res.status(200).send({ ok: true, message: "All users deleted." });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             ok: false,
//             code: "SERVER_ERROR"
//         });
//     }
// })

module.exports = router;
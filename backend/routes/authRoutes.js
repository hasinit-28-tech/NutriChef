const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserAuth =
    require("../models/UserAuth");

const router = express.Router();


// SIGNUP

router.post("/signup", async (req, res) => {

    try {

        const { name, email, password } =
            req.body;

        const existingUser =
            await UserAuth.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            new UserAuth({
                name,
                email,
                password: hashedPassword
            });

        await user.save();

        res.status(201).json({
            success: true,
            message: "Signup Successful"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// LOGIN

router.post("/login", async (req, res) => {

    try {

        const { email, password } =
            req.body;

        const user =
            await UserAuth.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token =
            jwt.sign(
                {
                    id: user._id
                },
                "nutrichefsecret",
                {
                    expiresIn: "7d"
                }
            );

        res.json({
            success: true,
            token,
            name: user.name
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;
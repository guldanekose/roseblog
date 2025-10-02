import jwt from "jsonwebtoken"
import { db } from "../db.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        // Check if user exists
        const [existingUsers] = await db.query(
            "SELECT * FROM users WHERE email = ? OR username = ?",
            [req.body.email, req.body.username]
        )

        if (existingUsers.length > 0) {
            return res.status(409).json("User already exists!")
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        // Insert user
        const [result] = await db.query(
            "INSERT INTO users(`email`,`username`,`password`) VALUES (?, ?, ?)",
            [req.body.email, req.body.username, hash]
        )

        return res.status(200).json("User has been created.")
    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
}

export const login = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [req.body.username]
        )

        if (!rows || rows.length === 0) {
            return res.status(404).json("User not found")
        }

        const user = rows[0]
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or password")
        }

        // oluşturulacak token (secret'ı env'den oku)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "jwtkey", {
            expiresIn: "1d",
        })


        const { password, ...other } = user

        // cookie set (httpOnly)
        return res
            .cookie("access_token", token, {
                httpOnly: true,
                // secure: true, // production'da HTTPS kullanıyorsan aç
                // sameSite: "lax", // gerektiğinde ayarla
            })
            .status(200)
            .json(other)
    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out")

}
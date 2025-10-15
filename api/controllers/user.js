import { db } from "../db.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const JWT_KEY = "jwtkey";

const verifyTokenFromCookie = (req) => {
    const token = req.cookies?.access_token;
    if (!token) {
        const err = new Error("Not authenticated");
        err.status = 401;
        throw err;
    }
    return jwt.verify(token, JWT_KEY);
};

// GET /api/users/:id
export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const q = "SELECT id, username, email, img FROM users WHERE id = ?";
        const [rows] = await db.query(q, [userId]);
        if (!rows[0]) return res.status(404).json("User not found");
        // convert img to client accessible path if needed (client/public/upload)
        return res.status(200).json(rows[0]);
    } catch (err) {
        console.error("getUser error:", err);
        return res.status(500).json(err.message || err);
    }
};

// PUT /api/users/:id  -> update username / email / img
export const updateUser = async (req, res) => {
    try {
        const userInfo = verifyTokenFromCookie(req);
        const userId = Number(req.params.id);

        if (userInfo.id !== userId) return res.status(403).json("You can update only your profile");

        const { username, email, img } = req.body;
        // Basit validation: username is required (isteğe bağlı)
        if (!username && !email && !img) {
            return res.status(400).json("Nothing to update");
        }

        // build query dynamically
        const fields = [];
        const values = [];
        if (username !== undefined) { fields.push("username = ?"); values.push(username); }
        if (email !== undefined) { fields.push("email = ?"); values.push(email); }
        if (img !== undefined) { fields.push("img = ?"); values.push(img); }

        values.push(userId);
        const q = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
        const [result] = await db.query(q, values);

        if (result.affectedRows === 0) return res.status(404).json("User not found or not updated");

        const [rows] = await db.query("SELECT id, username, email, img FROM users WHERE id = ?", [userId]);
        return res.status(200).json(rows[0]);
    } catch (err) {
        console.error("updateUser error:", err);
        const status = err.status || 500;
        return res.status(status).json(err.message || err);
    }
};

// DELETE /api/users/:id/avatar  -> deletes file + set img = NULL
export const deleteAvatar = async (req, res) => {
    try {
        const userInfo = verifyTokenFromCookie(req);
        const userId = Number(req.params.id);

        if (userInfo.id !== userId) return res.status(403).json("You can delete only your avatar");

        // get current avatar filename/path
        const [rows] = await db.query("SELECT img FROM users WHERE id = ?", [userId]);
        const img = rows[0]?.img;
        if (!img) return res.status(400).json("No avatar to delete");

        // file is inside client/public/upload (senin upload config)
        // build absolute path
        const uploadDir = path.join(process.cwd(), "../client/public/upload"); // eşleşmeyi projenin yapsısına göre kontrol et
        const filePath = path.join(uploadDir, img);

        // remove file if exists (try/catch)
        if (fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); } catch (e) { console.warn("Could not delete file:", e); }
        }

        // set img = NULL in DB
        await db.query("UPDATE users SET img = NULL WHERE id = ?", [userId]);
        return res.status(200).json("Avatar deleted");
    } catch (err) {
        console.error("deleteAvatar error:", err);
        const status = err.status || 500;
        return res.status(status).json(err.message || err);
    }
};

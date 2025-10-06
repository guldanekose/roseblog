import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = async (req, res) => {

    try {
        const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

        const [rows] = await db.query(q, [req.query.cat])


        return res.status(200).json(rows)

    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }
};

export const getPost = async (req, res) => {
    try {

        const q = "SELECT `username`, `title`, `desc`, p.id, p.img, u.img AS userImg, cat, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id= ?"

        const [rows] = await db.query(q, [req.params.id])
        return res.status(200).json(rows[0])

    } catch (err) {
        console.error(err)
        return res.status(500).json(err)
    }

};

export const deletePost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    try {
        const userInfo = jwt.verify(token, "jwtkey");

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

        const [result] = await db.query(q, [postId, userInfo.id]);

        if (result.affectedRows === 0) {
            return res.status(403).json("You can delete only your posts!");
        }

        return res.status(200).json("Post has been deleted!");
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};

export const addPost = async (req, res) => {

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    try {
        const userInfo = jwt.verify(token, "jwtkey");


        const q =
            "INSERT INTO posts (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?, ?, ?, ?, ?, ?)";
        const dateValue = req.body.date || new Date(); // ya da db'de DEFAULT NOW()
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            dateValue,
            userInfo.id,
        ];

        const [result] = await db.query(q, values);

        if (result.affectedRows === 0) {
            return res.status(500).json("Could not create post");
        }

        return res.status(200).json("Post has been created!");
    } catch (err) {
        console.error("addPost error:", err);
        return res.status(500).json(err);
    }
};

export const updatePost = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    try {
        const userInfo = jwt.verify(token, "jwtkey");

        const postId = req.params.id;
        const q =
            "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ? WHERE `id` = ? AND `uid` = ?";
        const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, postId, userInfo.id];

        const [result] = await db.query(q, values);

        if (result.affectedRows === 0) {
            // Ya post yoktur ya da bu kullanıcıya ait değildir
            return res.status(403).json("You can update only your posts!");
        }

        return res.status(200).json("Post has been updated!");
    } catch (err) {
        console.error("updatePost error:", err);
        return res.status(500).json(err);
    }
};
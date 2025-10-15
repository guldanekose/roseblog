import express from "express";
import { getUser, updateUser, deleteAvatar } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id/avatar", deleteAvatar);

export default router;
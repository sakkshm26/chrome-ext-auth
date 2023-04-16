import express from "express";
import { getUserInfo } from "../controllers/index.js";

const router = express.Router();

router.get("/get", getUserInfo);

export default router;

import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user_id).select({"name": 1, "email": 1, "requests_remaining": 1, "tier": 1});

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

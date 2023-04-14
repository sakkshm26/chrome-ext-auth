import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ errorMessage: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ errorMessage: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "20d",
      }
    );

    res.status(200).json({ user_id: existingUser._id, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ errorMessage: "User with same email already exists" });

    if (password !== confirm_password)
      return res.status(400).json({ errorMessage: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "20d",
      }
    );

    res.status(200).json({ user_id: user._id, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

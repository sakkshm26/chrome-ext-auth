import express from "express";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

mongoose
  .connect("mongodb://0.0.0.0:27017/tariusdb")
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.get("/", (req, res) => {
    res.send("unauthorized")
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
const { connection } = require("./Config/db");
const express = require("express");

const app = express();
const { UserModel } = require("./Model/user.model");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  const { Name, Difficulty } = req.body;
  try {
    const user = new UserModel({ Name, Difficulty });
    await user.save();
    res.send(user);
  } catch (err) {
    res.send("Error in registering the user");
    console.log(err);
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const users = await UserModel.find().sort({ Score: -1 });
    res.send(users);
  } catch (err) {
    res.send("Something went wrong");
  }
});

app.get("/getword", async (req, res) => {
  try {
    let wordArray = [
      "random",
      "increase",
      "decrease",
      "alphabet",
      "functionality",
      "language",
      "simultaneously",
      "virtual",
      "similarly",
      "unique",
      "according",
      "changed",
      "displayed",
      "individual",
      "components",
      "designs",
      "personal",
      "instructions",
      "carefully",
    ];
    let data = wordArray[Math.floor(Math.random() * wordArray.length)];
    res.send(data);
  } catch (err) {
    res.send("Something went wrong");
  }
});
app.patch("/editScore/:userId/:score", async (req, res) => {
  let score = +req.params.score;
  let userId = req.params.userId;

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { Score: score }
    );
    console.log(user, score, userId);
    res.send("score added successfully");
  } catch (err) {
    res.send("Something went wrong");
    console.log(err);
  }
});
app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log(`Connect to db and running on ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});

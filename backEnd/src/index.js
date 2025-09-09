import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authenticateToken, loginHandler, getUserInfo } from "./auth.js";
import {
  HandelGetQuestions,
  createQuestion,
  createAnswer,
  getAnswersForQuestion,
} from "./QandA.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.post("/login", loginHandler);

app.get("/userInfo", authenticateToken, getUserInfo);

app.post("/createQuestion", authenticateToken, createQuestion);
app.get("/getQuestions", authenticateToken, HandelGetQuestions);

app.post("/answer", authenticateToken, createAnswer);
app.get("/getQuestionAnswers", authenticateToken, getAnswersForQuestion);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

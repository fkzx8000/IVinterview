import { db } from "./database.js";

const QuestionsList = [
  {
    id: 1,
    title: "What is the capital of France?",
    body: "i dont know",
    tags: ["geography", "europe"],
    ownerId: 1,
  },
  {
    id: 2,
    title: "How to reverse a string in JavaScript?",
    body: "i dont know",
    tags: ["javascript", "programming"],
    ownerId: 2,
  },
];
const AnswersList = [
  { questionId: 1, body: "no body wont to know...", ownerId: 2 },
];

async function HandelGetQuestions(req, res) {
  try {
    const getQuestionsQuery = "SELECT * FROM questions";
    const [rows] = await db.execute(getQuestionsQuery);
    if (!req.query) return res.json(rows);
    const filteredQuestions = rows.filter((q) => {
      for (const key in req.query) {
        if (key === "tags") {
          const tags = req.query[key].split(",");
          for (const tag of tags) if (!q.tags.includes(tag)) return false;
        } else if (q[key] != req.query[key]) return false;
      }
      return true;
    });
    return res.json(filteredQuestions);
  } catch (error) {
    console.error("שגיאה בקבלת שאלות:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function createQuestion(req, res) {
  try {
    const { title, body, tags } = req.body;
    const ownerId = req.user.userId;

    if (!title || !body)
      return res.status(400).json({ message: "Title and body are required" });
    if (!ownerId)
      return res.status(400).json({ message: "Owner ID is required" });

    const insertQuestionQuery = `
      INSERT INTO questions (title, body, tags, ownerId) 
      VALUES (?, ?, ?, ?)
    `;
    const tagsJson = tags ? JSON.stringify(tags) : JSON.stringify([]);

    const [result] = await db.execute(insertQuestionQuery, [
      title,
      body,
      tagsJson,
      ownerId,
    ]);

    const newQuestion = {
      id: result.insertId,
      title,
      body,
      tags: tags || [],
      ownerId,
    };
    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function createAnswer(req, res) {
  try {
    const { questionId, body } = req.body;
    const ownerId = req.user.userId;

    if (!questionId || !body)
      return res
        .status(400)
        .json({ message: "Some information is missing...." });

    const checkQuestionQuery = "SELECT id FROM questions WHERE id = ?";
    const [questionRows] = await db.execute(checkQuestionQuery, [questionId]);

    if (questionRows.length === 0)
      return res.status(404).json({ message: "Question not found" });

    const insertAnswerQuery = `
      INSERT INTO answers (questionId, body, ownerId) 
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(insertAnswerQuery, [
      questionId,
      body,
      ownerId,
    ]);

    const newAnswer = {
      id: result.insertId,
      questionId: parseInt(questionId),
      body,
      ownerId,
    };

    res.status(201).json({
      message: "Answer created successfully",
      answer: newAnswer,
    });
  } catch (error) {
    console.error("שגיאה ביצירת תשובה:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAnswersForQuestion(req, res) {
  try {
    const questionId = parseInt(req.query.questionId);
    if (!questionId)
      return res.status(400).json({ message: "Question ID is required" });

    const getAnswersQuery = `
      SELECT a.*, u.Nickname as ownerNickname, u.fullName as ownerFullName
      FROM answers a
      LEFT JOIN users u ON a.ownerId = u.id
      WHERE a.questionId = ?
      ORDER BY a.created_at ASC
    `;

    const [rows] = await db.execute(getAnswersQuery, [questionId]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export {
  HandelGetQuestions,
  createQuestion,
  createAnswer,
  getAnswersForQuestion,
};

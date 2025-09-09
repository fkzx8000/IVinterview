import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useGetAnswersForQuestionQuery,
  useCreateAnswerMutation,
} from "../store/apiSlice";
import { logout, selectCurrentUser } from "../store/authSlice";
import "../styles/main.css";

const QuestionsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    body: "",
    tags: "",
  });
  const [newAnswer, setNewAnswer] = useState("");

  const {
    data: questions = [],
    isLoading: questionsLoading,
    error: questionsError,
    refetch: refetchQuestions,
  } = useGetQuestionsQuery();

  const { data: answers = [], isLoading: answersLoading } =
    useGetAnswersForQuestionQuery(selectedQuestion?.id, {
      skip: !selectedQuestion?.id,
    });

  const [createQuestion, { isLoading: creatingQuestion }] =
    useCreateQuestionMutation();
  const [createAnswer, { isLoading: creatingAnswer }] =
    useCreateAnswerMutation();

  const handleCreateQuestion = async (e) => {
    e.preventDefault();

    try {
      const tagsArray = newQuestion.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      await createQuestion({
        title: newQuestion.title,
        body: newQuestion.body,
        tags: tagsArray,
      }).unwrap();
      setNewQuestion({ title: "", body: "", tags: "" });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleCreateAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await createAnswer({
        questionId: selectedQuestion.id,
        body: newAnswer,
      }).unwrap();

      setNewAnswer("");
    } catch (error) {
      console.error("Error creating answer:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  if (questionsError) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--brand-bg)" }}
      >
        <div className="container">
          <div className="card text-center">
            <div className="card-header">
              <div className="sticker is-orange sticker-sm">⚠️</div>
              <h2>שגיאה בטעינת השאלות</h2>
            </div>
            <div className="card-body">
              <p>אירעה שגיאה בעת טעינת השאלות. אנא נסה שוב.</p>
              <button onClick={refetchQuestions} className="sticker is-mint">
                נסה שוב
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)" }}>
      {/* Header */}
      <header className="container">
        <div className="card" style={{ marginBottom: "var(--space-6)" }}>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="sticker is-purple">
                  מערכת{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="User-Question--Streamline-Ultimate"
                    height="24"
                    width="24"
                  >
                    <desc>
                      User Question Streamline Icon: https://streamlinehq.com
                    </desc>
                    <path
                      d="M21.43 9.86a7.46 7.46 0 0 1 -0.72 -1.45c0 -5.27 -4.87 -8.41 -9.57 -8.41a9.93 9.93 0 0 0 -10 10.06c0 3.6 1.35 6.28 4 8v5.44a0.5 0.5 0 0 0 0.5 0.5h10a0.5 0.5 0 0 0 0.5 -0.5v-3c1.74 0 2.8 -0.21 3.58 -1s1 -3.34 1 -4.53h1a1.3 1.3 0 0 0 1 -0.52 1.27 1.27 0 0 0 0.19 -0.75 7.64 7.64 0 0 0 -1.48 -3.84ZM11.5 17.5A1.5 1.5 0 1 1 13 16a1.5 1.5 0 0 1 -1.5 1.5Zm1.6 -6.08a1 1 0 0 0 -0.6 0.92 1 1 0 0 1 -2 0 3 3 0 0 1 1.8 -2.75 2 2 0 1 0 -2.8 -1.84 1 1 0 0 1 -2 0 4 4 0 1 1 5.6 3.67Z"
                      fill="#000000"
                      stroke-width="1"
                    ></path>
                  </svg>{" "}
                  ותשובות
                </div>
                <div>
                  <h1 style={{ fontSize: "var(--fs-3xl)", margin: 0 }}>
                    שלום, {user?.nickname || user?.fullName}
                  </h1>
                  <p style={{ margin: 0, color: "var(--grey-600)" }}>
                    ברוך הבא למערכת הניהול שלנו
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="sticker is-orange sticker-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="-0.5 -0.5 24 24"
                  id="Logout-2--Streamline-Sharp"
                  height="24"
                  width="24"
                >
                  <desc>
                    Logout 2 Streamline Icon: https://streamlinehq.com
                  </desc>
                  <g id="logout-2--arrow-enter-right-logout-point-circle">
                    <path
                      id="Ellipse 378"
                      stroke="#000000"
                      d="M16.970166666666668 5.75a8.625 8.625 0 1 0 0 11.5"
                      stroke-width="1"
                    ></path>
                    <path
                      id="Vector 1185"
                      stroke="#000000"
                      d="M21.083333333333336 11.5H7.666666666666667"
                      stroke-width="1"
                    ></path>
                    <path
                      id="Vector 1186"
                      stroke="#000000"
                      d="m17.25 7.666666666666667 3.8333333333333335 3.8333333333333335 -3.8333333333333335 3.8333333333333335"
                      stroke-width="1"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: selectedQuestion ? "1fr 1fr" : "1fr",
            gap: "var(--space-6)",
          }}
        >
          {/* Questions Section */}
          <div>
            <div className="card">
              <div className="card-header">
                <div
                  className="flex justify-between items-center"
                  style={{ width: "100%" }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "var(--fs-2xl)" }}></span>
                    <h2 style={{ margin: 0 }}>שאלות ({questions.length})</h2>
                  </div>
                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className={`sticker sticker-sm ${
                      showCreateForm ? "is-orange" : "is-mint"
                    }`}
                    disabled={creatingQuestion}
                  >
                    {showCreateForm ? " ביטול" : " שאלה חדשה"}
                  </button>
                </div>
              </div>

              <div className="card-body">
                {/* Create Question Form */}
                {showCreateForm && (
                  <div
                    className="card"
                    style={{
                      marginBottom: "var(--space-5)",
                      background: "var(--brand-sage)",
                    }}
                  >
                    <div className="card-body">
                      <h3
                        style={{
                          fontSize: "var(--fs-xl)",
                          marginBottom: "var(--space-4)",
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          id="Drawer-Send--Streamline-Ultimate"
                          height="24"
                          width="24"
                        >
                          <desc>
                            Drawer Send Streamline Icon:
                            https://streamlinehq.com
                          </desc>
                          <path
                            d="M23.5 22.5a1 1 0 0 1 -1 1h-21a1 1 0 0 1 -1 -1v-6h7v1a2.006 2.006 0 0 0 2 2h5a2.006 2.006 0 0 0 2 -2v-1h7Z"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                          ></path>
                          <path
                            d="M14.5 10.5h4.926a1 1 0 0 1 0.863 0.5l3.211 5.5"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                          ></path>
                          <path
                            d="M0.5 16.5 3.711 11a1 1 0 0 1 0.863 -0.5H6.5"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                          ></path>
                          <path
                            d="M18.5 8.5v-2a9.806 9.806 0 0 0 -10 7.5s0 -11.5 10 -11.5v-2l5 4Z"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                          ></path>
                        </svg>{" "}
                        צור שאלה חדשה
                      </h3>
                      <form onSubmit={handleCreateQuestion}>
                        <div className="field">
                          <label className="label">כותרת השאלה</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="מה השאלה שלך?"
                            value={newQuestion.title}
                            onChange={(e) =>
                              setNewQuestion({
                                ...newQuestion,
                                title: e.target.value,
                              })
                            }
                            required
                            disabled={creatingQuestion}
                          />
                        </div>

                        <div className="field">
                          <label className="label">תיאור מפורט</label>
                          <textarea
                            className="textarea"
                            placeholder="תאר את השאלה שלך בפירוט..."
                            value={newQuestion.body}
                            onChange={(e) =>
                              setNewQuestion({
                                ...newQuestion,
                                body: e.target.value,
                              })
                            }
                            required
                            disabled={creatingQuestion}
                            style={{ minHeight: "120px" }}
                          />
                        </div>

                        <div className="field">
                          <label className="label">תגיות (מופרדות בפסיק)</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="javascript, react, css..."
                            value={newQuestion.tags}
                            onChange={(e) =>
                              setNewQuestion({
                                ...newQuestion,
                                tags: e.target.value,
                              })
                            }
                            disabled={creatingQuestion}
                          />
                        </div>

                        <button
                          type="submit"
                          className="sticker is-purple"
                          disabled={creatingQuestion}
                          style={{ width: "100%" }}
                        >
                          {creatingQuestion ? " יוצר..." : " צור שאלה"}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Questions List */}
                <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                  {questionsLoading ? (
                    <div
                      className="text-center"
                      style={{ padding: "var(--space-8)" }}
                    >
                      <div
                        className="spinner"
                        style={{ margin: "0 auto var(--space-4) auto" }}
                      ></div>
                      <p>טוען שאלות...</p>
                    </div>
                  ) : questions.length === 0 ? (
                    <div
                      className="text-center"
                      style={{ padding: "var(--space-8)" }}
                    >
                      <div
                        className="sticker is-sage sticker-lg"
                        style={{ margin: "0 auto var(--space-4) auto" }}
                      ></div>
                      <h3>אין שאלות עדיין</h3>
                      <p>היה הראשון לשאול שאלה!</p>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gap: "var(--space-3)" }}>
                      {questions.map((question) => {
                        const tags =
                          typeof question.tags === "string"
                            ? JSON.parse(question.tags || "[]")
                            : question.tags || [];

                        const isSelected = selectedQuestion?.id === question.id;

                        return (
                          <div
                            key={question.id}
                            className={`card ${
                              isSelected ? "selected-question" : ""
                            }`}
                            onClick={() => handleQuestionSelect(question)}
                            style={{
                              cursor: "pointer",
                              transform: isSelected
                                ? "translate(-2px, -2px)"
                                : "none",
                              background: isSelected
                                ? "var(--brand-mint)"
                                : "white",
                            }}
                          >
                            <div className="card-body">
                              <h3
                                style={{
                                  fontSize: "var(--fs-lg)",
                                  marginBottom: "var(--space-2)",
                                }}
                              >
                                {question.title}
                              </h3>
                              <p
                                style={{
                                  color: "var(--grey-700)",
                                  fontSize: "var(--fs-sm)",
                                  marginBottom: "var(--space-3)",
                                  lineHeight: "var(--leading-relaxed)",
                                }}
                              >
                                {question.body.length > 100
                                  ? question.body.substring(0, 100) + "..."
                                  : question.body}
                              </p>

                              {tags.length > 0 && (
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "var(--space-2)",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="chip is-yellow"
                                      style={{ fontSize: "var(--fs-xs)" }}
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Answers Section */}
          {selectedQuestion && (
            <div>
              <div className="card">
                <div className="card-header">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 style={{ margin: 0, fontSize: "var(--fs-xl)" }}>
                        תשובות
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "var(--fs-sm)",
                          color: "var(--grey-700)",
                        }}
                      >
                        {selectedQuestion.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {/* Original Question */}
                  <div
                    className="card"
                    style={{
                      background: "var(--brand-sage)",
                      marginBottom: "var(--space-5)",
                    }}
                  >
                    <div className="card-body">
                      <h4
                        style={{
                          fontSize: "var(--fs-lg)",
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        השאלה המקורית
                      </h4>
                      <p style={{ lineHeight: "var(--leading-relaxed)" }}>
                        {selectedQuestion.body}
                      </p>
                    </div>
                  </div>

                  {/* Answers List */}
                  <div
                    style={{
                      maxHeight: "400px",
                      overflowY: "auto",
                      marginBottom: "var(--space-5)",
                    }}
                  >
                    {answersLoading ? (
                      <div
                        className="text-center"
                        style={{ padding: "var(--space-6)" }}
                      >
                        <div
                          className="spinner"
                          style={{ margin: "0 auto var(--space-3) auto" }}
                        ></div>
                        <p>טוען תשובות...</p>
                      </div>
                    ) : answers.length === 0 ? (
                      <div
                        className="text-center"
                        style={{ padding: "var(--space-6)" }}
                      >
                        <div
                          className="sticker is-blue sticker-sm"
                          style={{ margin: "0 auto var(--space-3) auto" }}
                        ></div>
                        <p>אין תשובות עדיין. היה הראשון לענות!</p>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gap: "var(--space-3)" }}>
                        {answers.map((answer) => (
                          <div key={answer.id} className="card">
                            <div className="card-body">
                              <p
                                style={{
                                  lineHeight: "var(--leading-relaxed)",
                                  marginBottom: "var(--space-3)",
                                }}
                              >
                                {answer.body}
                              </p>
                              <div className="flex justify-between items-center">
                                <div
                                  className="chip is-purple"
                                  style={{ fontSize: "var(--fs-xs)" }}
                                >
                                  {answer.ownerNickname || answer.ownerFullName}
                                </div>
                                {answer.created_at && (
                                  <small style={{ color: "var(--grey-600)" }}>
                                    {new Date(
                                      answer.created_at
                                    ).toLocaleDateString("he-IL")}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Create Answer Form */}
                  <div
                    className="card"
                    style={{ background: "var(--brand-pink)" }}
                  >
                    <div className="card-body">
                      <h4
                        style={{
                          fontSize: "var(--fs-lg)",
                          marginBottom: "var(--space-3)",
                        }}
                      >
                        כתוב תשובה
                      </h4>
                      <form onSubmit={handleCreateAnswer}>
                        <div className="field">
                          <textarea
                            className="textarea"
                            placeholder="שתף את התשובה או הדעה שלך..."
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            required
                            disabled={creatingAnswer}
                            style={{ minHeight: "120px" }}
                          />
                        </div>
                        <button
                          type="submit"
                          className="sticker is-mint"
                          disabled={creatingAnswer}
                          style={{ width: "100%" }}
                        >
                          {creatingAnswer ? " שולח..." : " שלח תשובה"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CSS נוסף לקומפוננטה זו
const styles = `
  .selected-question {
    border-color: var(--brand-mint) !important;
    box-shadow: 8px 8px 0 rgba(159, 224, 176, 0.7) !important;
  }

  .spinner {
    width: 32px;
    height: 32px;
    border: 4px solid var(--grey-200);
    border-top: 4px solid var(--brand-purple);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .min-h-screen {
    min-height: 100vh;
  }

  @media (max-width: 768px) {
    .questions-page-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default QuestionsPage;

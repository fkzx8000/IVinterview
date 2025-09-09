import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadFromStorage, selectIsAuthenticated } from "./store/authSlice";
import LoginPage from "./components/LoginPage";
import QuestionsPage from "./components/QuestionsPage";
import "./styles/main.css";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <div className="app">
      {isAuthenticated ? <QuestionsPage /> : <LoginPage />}
    </div>
  );
}

export default App;

import { useState } from "react";
import { useLoginMutation } from "../store/apiSlice";
import "../styles/main.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--brand-bg)" }}
    >
      <div className="container">
        <div className="flex justify-center">
          <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
            <div className="card-header text-center">
              <div
                className="sticker is-purple sticker-sm"
                style={{ margin: "0 auto" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="-0.5 -0.5 24 24"
                  id="User-Arrows-Account-Switch--Streamline-Sharp"
                  height="24"
                  width="24"
                >
                  <desc>
                    User Arrows Account Switch Streamline Icon:
                    https://streamlinehq.com
                  </desc>
                  <g id="user-arrows-account-switch--user-arrows-account-switch-reload">
                    <path
                      id="Ellipse 350"
                      stroke="#000000"
                      d="M8.625 9.583333333333334a2.875 2.875 0 1 0 5.75 0 2.875 2.875 0 1 0 -5.75 0"
                      stroke-width="1"
                    ></path>
                    <path
                      id="Ellipse 418"
                      stroke="#000000"
                      d="M4.192593333333334 17.700416666666666C6.2453433333333335 16.211358333333333 8.77015875 15.333333333333334 11.500095833333333 15.333333333333334c2.7298125 0 5.2546375 0.878025 7.3073875 2.3670833333333334"
                      stroke-width="1"
                    ></path>
                    <path
                      id="Ellipse 1216"
                      stroke="#000000"
                      d="M19.504958333333335 6.229166666666667C17.790691666666667 3.6310195833333334 14.845541666666668 1.9166666666666667 11.5 1.9166666666666667 6.20726875 1.9166666666666667 1.9166666666666667 6.20726875 1.9166666666666667 11.5c0 5.292683333333334 4.290602083333334 9.583333333333334 9.583333333333334 9.583333333333334 5.292683333333334 0 9.583333333333334 -4.29065 9.583333333333334 -9.583333333333334 0 -0.6563625 -0.06602916666666667 -1.2973916666666667 -0.19166666666666668 -1.9166666666666667"
                      stroke-width="1"
                    ></path>
                    <path
                      id="Vector 2754"
                      stroke="#000000"
                      d="M19.645833333333336 2.3958333333333335v3.8333333333333335h-3.8333333333333335"
                      stroke-width="1"
                    ></path>
                  </g>
                </svg>
              </div>
              <h2 style={{ margin: "0", fontSize: "var(--fs-2xl)" }}>
                התחברות למערכת
              </h2>
            </div>

            <div className="card-body">
              {error && (
                <div className="error-message">
                  {error?.data?.message ||
                    "שגיאה בהתחברות - אנא בדוק את הפרטים"}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="email" className="label">
                    כתובת אימייל
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="הכנס את כתובת האימייל שלך"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="field">
                  <label htmlFor="password" className="label">
                    סיסמה
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="input"
                    placeholder="הכנס את הסיסמה שלך"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  className="sticker is-mint sticker-lg"
                  style={{ width: "100%", marginTop: "var(--space-4)" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner"
                        style={{ width: "20px", height: "20px" }}
                      ></span>
                      מתחבר...
                    </>
                  ) : (
                    <>התחבר למערכת</>
                  )}
                </button>
              </form>
            </div>

            <div className="card-footer text-center">
              <small style={{ color: "var(--grey-600)" }}>
                שאלה מה שואלים בשאלות?
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
  .spinner {
    border: 3px solid var(--grey-200);
    border-top: 3px solid var(--brand-purple);
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
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default LoginPage;

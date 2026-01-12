import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Main from "./components/Main/Main";

import styles from "./App.module.css";

function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 ВОССТАНОВЛЕНИЕ СЕССИИ ПРИ F5
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/me.php", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser({
            id: data.user.id,
            login: data.user.username,
            token,
          });
          setScreen("main");
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ⏳ пока проверяем токен — ничего не рендерим
  if (loading) return null;

  return (
    <div className={styles.app}>
      {screen === "login" && <Login setScreen={setScreen} setUser={setUser} />}
      {screen === "register" && (
        <Register setScreen={setScreen} setUser={setUser} />
      )}
      {screen === "main" && (
        <Main
          user={user}
          setUser={setUser}
          goToLogin={() => setScreen("login")}
        />
      )}
    </div>
  );
}

export default App;

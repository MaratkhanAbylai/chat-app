import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Main from "./components/Main/Main";
import styles from "./App.module.css";

function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);

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

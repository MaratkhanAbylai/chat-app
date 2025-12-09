import { useState } from "react";
import "./Register.css";

function Register({ setScreen }) {
  const [login, setLogin] = useState("");
  const [passwordFirst, setPasswordFirst] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (passwordFirst !== passwordSecond) {
      alert("Пароли не совпадают");
      setPasswordFirst("");
      setPasswordSecond("");
      return;
    }

    try {
      setLoading(true);

      const data = {
        username: login,
        password: passwordFirst,
      };

      const response = await fetch("http://192.168.43.47/chatapp/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "error") {
        alert(result.message);
        return;
      }

      alert("Успех");
      setLogin("");
      setPasswordFirst("");
      setPasswordSecond("");
    } catch {
      alert("Ошибка");
    } finally {
      setLoading(false);
    }
  }

  function changeComponent() {
    setScreen("login");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Регистрация</h1>
        <p className="auth-subtitle">Создайте аккаунт для входа в чат</p>

        <div className="Register">
          <label className="auth-field">
            <span className="auth-label">Логин</span>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Придумайте логин"
            />
          </label>

          <label className="auth-field">
            <span className="auth-label">Пароль</span>
            <input
              type="password"
              value={passwordFirst}
              onChange={(e) => setPasswordFirst(e.target.value)}
              placeholder="Придумайте пароль"
            />
          </label>

          <label className="auth-field">
            <span className="auth-label">Повторите пароль</span>
            <input
              type="password"
              value={passwordSecond}
              onChange={(e) => setPasswordSecond(e.target.value)}
              placeholder="Повторите пароль"
            />
          </label>

          <button
            type="submit"
            onClick={handleClick}
            disabled={loading}
            className="auth-button primary"
          >
            {loading ? "Попытка регистрации..." : "Зарегистрироваться"}
          </button>

          <div className="auth-divider">
            <span>или</span>
          </div>

          <button
            type="button"
            onClick={changeComponent}
            className="auth-button secondary"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
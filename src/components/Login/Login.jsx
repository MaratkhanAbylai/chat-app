import { useState } from "react";
import classes from "./Login.module.css";

function Login({ setScreen, setUser }) {
    const [nameValue, setNameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        if (!nameValue || !passwordValue) {
            alert("Введите логин и пароль");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("http://localhost:8000/log.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: nameValue,
                    password: passwordValue
                })
            });

            const res = await response.json();

            if (!response.ok || res.status === "error") {
                alert(res.message || "Ошибка входа");
                return;
            }

            /* === РАБОТА С ТОКЕНОМ === */

            // 1. сохраняем токен
            localStorage.setItem("token", res.token);

            // 2. сохраняем пользователя в состоянии
            setUser({
                id: res.user_id,
                login: res.username,
                token: res.token
            });

            // 3. переходим в приложение
            setScreen("main");

        } catch (err) {
            console.error(err);
            alert("Ошибка сети");
        } finally {
            setLoading(false);
        }
    }

    function changeComponent() {
        setScreen("register");
    }

    return (
        <div className={classes.login}>
            <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                placeholder="Введите логин"
                disabled={loading}
            />

            <input
                type="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                placeholder="Введите пароль"
                disabled={loading}
            />

            <button disabled={loading} onClick={handleClick}>
                {loading ? "Попытка входа..." : "Войти"}
            </button>

            <p>или</p>

            <button onClick={changeComponent} disabled={loading}>
                Зарегистрироваться
            </button>
        </div>
    );
}

export default Login;

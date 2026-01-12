import { useState } from "react";
import classes from "./Register.module.css";

function Register({ setScreen, setUser }) {
    const [login, setLogin] = useState("");
    const [passwordFirst, setPasswordFirst] = useState("");
    const [passwordSecond, setPasswordSecond] = useState("");
    const [steer, setSteer] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        // 1. Валидация
        if (!login || !passwordFirst || !passwordSecond || !steer) {
            alert("Все поля должны быть заполнены");
            return;
        }

        if(login.length < 2) {
            alert('Логин должен состоять минимум из 2 символов');
            return;
        }

        if(steer.length > 30) {
            alert('Максимальная длина подсказки 30 символов');
            return;
        }

        if(steer === passwordFirst) {
            alert('Пароль и подсказка должны отличаться');
            return;
        }

        if (passwordFirst !== passwordSecond) {
            alert("Пароли не совпадают");
            return;
        }

        if(passwordFirst.length < 8) {
            alert("Пароль должен состоять минимум из 8 символов");
            return
        }

        try {
            setLoading(true);

            // 2. РЕГИСТРАЦИЯ (НЕ log.php!)
            const response = await fetch("http://localhost:8000/reg.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: login,
                    password: passwordFirst,
                    steer: steer
                })
            });

            const res = await response.json();

            if (!response.ok || res.status === "error") {
                alert(res.message || "Ошибка регистрации");
                return;
            }

            // 3. СОХРАНЯЕМ ТОКЕН
            localStorage.setItem("token", res.token);

            // 4. УСТАНАВЛИВАЕМ ПОЛЬЗОВАТЕЛЯ
            setUser({
                login: res.username,
                token: res.token
            });

            // 5. ПЕРЕХОД В ПРИЛОЖЕНИЕ
            setScreen("main");

        } catch (err) {
            console.error(err);
            alert("Ошибка сети");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={classes.Register}>
            <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Придумайте логин"
                disabled={loading}
            />

            <input
                type="password"
                value={passwordFirst}
                onChange={(e) => setPasswordFirst(e.target.value)}
                placeholder="Придумайте пароль"
                disabled={loading}
            />

            <input
                type="password"
                value={passwordSecond}
                onChange={(e) => setPasswordSecond(e.target.value)}
                placeholder="Повторите пароль"
                disabled={loading}
            />

            <input
                type="text"
                value={steer}
                onChange={(e) => setSteer(e.target.value)}
                placeholder="Подсказка к паролю"
                disabled={loading}
            />

            <button onClick={handleClick} disabled={loading}>
                {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>

            <p>или</p>

            <button onClick={() => setScreen('login')} disabled={loading}>
                Войти
            </button>
        </div>
    );
}

export default Register;

import { useState } from "react";
import "./LoginPage.css";
import { login } from "@/shared/api/auth.api";
import { Input, Button } from "@/shared/ui";
import { Link } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        setLoading(true);
        const res = await login({ username, password });
        setLoading(false);

        if (res.status === "error") return alert(res.message);

        alert("Добро пожаловать!");
    }

    return (
        <div className="login-container">
            <h1>Вход</h1>

            <Input placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} />
            <Input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <Button onClick={handleLogin} loading={loading}>Войти</Button>

            <p className="link">
                Нет аккаунта? <Link to="/register">Регистрация</Link>
            </p>
        </div>
    );
}

export default LoginPage;
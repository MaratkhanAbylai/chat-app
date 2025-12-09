import { useState } from "react";
import "./RegisterPage.css";
import { registerUser } from "@/shared/api/auth.api";
import { Input, Button } from "@/shared/ui";
import { Link } from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        if (password1 !== password2) {
            return alert("Пароли не совпадают");
        }

        setLoading(true);

        const res = await registerUser({ username, password: password1 });

        setLoading(false);

        if (res.status === "error") return alert(res.message);

        alert("Регистрация успешна!");
    }

    return (
        <div className="register-container">
            <h1>Регистрация</h1>

            <Input placeholder="Логин"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
            />

            <Input placeholder="Пароль"
                   type="password"
                   value={password1}
                   onChange={(e) => setPassword1(e.target.value)}
            />

            <Input placeholder="Повторите пароль"
                   type="password"
                   value={password2}
                   onChange={(e) => setPassword2(e.target.value)}
            />

            <Button onClick={handleRegister} loading={loading}>
                Зарегистрироваться
            </Button>

            <p className="link">
                Уже есть аккаунт? <Link to="/">Войти</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
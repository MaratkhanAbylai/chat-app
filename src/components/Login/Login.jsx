import { useState } from "react"
import './Login.modules.css'

function Login({ setScreen }) {
    
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        try {

            setLoading(true);

            const data = {
                username: nameValue,
                password: passwordValue
            }

            const response = await fetch('link to bd', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if(result.status === "error") {
                alert(result.message);
                return;
            }

            alert("Успешный вход!");
            setNameValue('');
            setPasswordValue('');
        } catch {
            alert("Ошибка сети");
        } finally {
            setLoading(false);
        }
    }

    function changeComponent() {
        setScreen('register');
    }

    return <>
        <div className="login">
            <input type="text"
             value={nameValue}
             onChange={e => setNameValue(e.target.value)}
             placeholder="Введите логин"
            />
            <input type="password" 
             value={passwordValue}
             onChange={e => setPasswordValue(e.target.value)}
             placeholder="Введите пароль"
            />
            <button disabled={loading} type="submit" onClick={handleClick}>{loading ? "Попытка входа..." : "Войти"}</button>
            <p>или</p>
            <button onClick={changeComponent}>Зарегистрироваться</button>
        </div>
    </>
}

export default Login;
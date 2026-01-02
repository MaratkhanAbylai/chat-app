import { useState } from "react"
import './Login.css'

function Login({ setScreen, setUser }) {
    
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        if(!nameValue || !passwordValue) {
            alert("Введите логин и пароль");
            return;
        }
        
        try {
            
            setLoading(true);

            const response = await fetch('http://localhost:8000/log.php', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: nameValue,
                    password: passwordValue
                })
            });

            const res = await response.json();

            if(!response.ok || res.status === 'error') {
                alert(res.message || 'Ошибка входа');
                return;
            }

            localStorage.setItem('token', res.token);

            setUser({
                login: res.username,
                avatar: res.avatar,
                token: res.token
            });

            setScreen('main');

        } catch(err) {
            console.error(err);
            alert('Ошибка сети');
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
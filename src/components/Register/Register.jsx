import { useState } from "react";
import './Register.css'

function Register({ setScreen, setUser }) {
    
    const [login, setLogin] = useState('');
    const [passwordFirst, setPasswordFirst] = useState('');
    const [passwordSecond, setPasswordSecond] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleClick() {

        if(!login || !passwordFirst || !passwordSecond) {
            alert('Все поля должны быть заполнен!');
            return;
        }

        if(passwordFirst !== passwordSecond) {
            alert('Пароли не совпадают');
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
                    username: login,
                    password: passwordFirst
                })
            });

            const res = await response.json();

            if(!response.ok || res.status === 'error') {
                alert(res.message || 'Произошла ошибка при регистрации');
                return;
            }

            localStorage.setItem('token', res.token);
            
            setUser({
                login: user.username,
                avatar: user.avatar,
                token: user.token
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
        setScreen('login');
    }

    return <>

        <div className="Register">
            <input type="text" 
             value={login}
             onChange={e => setLogin(e.target.value)}
             placeholder="Придумайте логин"
            />
            <input type="password" 
             value={passwordFirst}
             onChange={e => setPasswordFirst(e.target.value)}
             placeholder="Придумайте пароль"
            />
            <input type="password" 
             value={passwordSecond}
             onChange={e => setPasswordSecond(e.target.value)}
             placeholder="Повторите пароль"
            />
            <button type="submit" onClick={handleClick} disabled={loading}>{loading ? "Попытка регистрации..." : "Зарегистрироваться"}</button>
            <p>или</p>
            <button onClick={changeComponent}>Войти</button>
        </div>

    </>
}

export default Register;